import json
import os
import random
import string
import psycopg2  # noqa
from datetime import datetime

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p88081659_bravel_stars_donate")


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def gen_code(length=8):
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))


CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id",
}


def handler(event: dict, context) -> dict:
    """
    Управление заказами магазина гемов Brawl Stars.
    POST / — создать заказ (email, product_id, product_name, amount, promo_applied)
    PUT / — пометить заказ оплаченным и вернуть verify_code (order_id)
    POST /verify — подтвердить код (order_id, code)
    GET /?email=... — история заказов по почте
    """
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")

    headers = {**CORS, "Content-Type": "application/json"}

    # POST /verify — проверка кода
    if method == "POST" and path.rstrip("/").endswith("/verify"):
        body = json.loads(event.get("body") or "{}")
        order_id = body.get("order_id")
        code = (body.get("code") or "").strip().upper()

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT verify_code, status FROM {SCHEMA}.orders WHERE id = %s",
            (order_id,)
        )
        row = cur.fetchone()
        conn.close()

        if not row:
            return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Заказ не найден"})}

        verify_code, status = row
        if status == "completed":
            return {"statusCode": 200, "headers": headers, "body": json.dumps({"success": True, "message": "Уже выполнен"})}
        if verify_code != code:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Неверный код"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"UPDATE {SCHEMA}.orders SET status = 'completed', completed_at = %s WHERE id = %s",
            (datetime.now(), order_id)
        )
        conn.commit()
        conn.close()

        return {"statusCode": 200, "headers": headers, "body": json.dumps({"success": True, "message": "Заказ подтверждён"})}

    # PUT / — пометить оплаченным, вернуть код
    if method == "PUT":
        body = json.loads(event.get("body") or "{}")
        order_id = body.get("order_id")
        code = gen_code()

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"UPDATE {SCHEMA}.orders SET status = 'paid', paid_at = %s, verify_code = %s WHERE id = %s RETURNING verify_code",
            (datetime.now(), code, order_id)
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()

        if not row:
            return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Заказ не найден"})}

        return {"statusCode": 200, "headers": headers, "body": json.dumps({"success": True, "verify_code": code})}

    # GET /?email=... — история заказов
    if method == "GET":
        email = (event.get("queryStringParameters") or {}).get("email", "")
        if not email:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "email обязателен"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, product_name, amount, status, created_at FROM {SCHEMA}.orders WHERE email = %s ORDER BY created_at DESC LIMIT 20",
            (email,)
        )
        rows = cur.fetchall()
        conn.close()

        orders = [
            {
                "id": r[0],
                "product_name": r[1],
                "amount": r[2],
                "status": r[3],
                "created_at": r[4].strftime("%d.%m.%Y %H:%M") if r[4] else None,
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"orders": orders})}

    # POST / — создать заказ
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        email = (body.get("email") or "").strip().lower()
        product_id = body.get("product_id")
        product_name = body.get("product_name", "")
        amount = body.get("amount", 0)
        promo_applied = body.get("promo_applied", False)

        if not email or "@" not in email:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Некорректный email"})}
        if not product_id or not amount:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "product_id и amount обязательны"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.orders (email, product_id, product_name, amount, promo_applied) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (email, product_id, product_name, amount, promo_applied)
        )
        order_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        return {"statusCode": 200, "headers": headers, "body": json.dumps({"success": True, "order_id": order_id})}

    return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}