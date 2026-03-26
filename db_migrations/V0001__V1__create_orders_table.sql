
CREATE TABLE t_p88081659_bravel_stars_donate.orders (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  promo_applied BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  verify_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX idx_orders_email ON t_p88081659_bravel_stars_donate.orders(email);
CREATE INDEX idx_orders_status ON t_p88081659_bravel_stars_donate.orders(status);
CREATE INDEX idx_orders_verify_code ON t_p88081659_bravel_stars_donate.orders(verify_code);
