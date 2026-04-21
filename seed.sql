-- Seed: Dados fake para desenvolvimento
-- Executar direto no client do PostgreSQL
-- Limpa dados existentes (ordem reversa por FK)

DELETE FROM stock_movements;
DELETE FROM product;
DELETE FROM supplier;
DELETE FROM client;
DELETE FROM city;
DELETE FROM state;
DELETE FROM brand;
DELETE FROM model;
DELETE FROM category;
DELETE FROM manufacturer;

-- Estado
INSERT INTO state (id, name, code_country, abbreviation) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'São Paulo', 'BR', 'SP'),
  ('a1b2c3d4-0001-4000-8000-000000000002', 'Rio de Janeiro', 'BR', 'RJ'),
  ('a1b2c3d4-0001-4000-8000-000000000003', 'Minas Gerais', 'BR', 'MG');

-- Cidade
INSERT INTO city (id, name, state_id) VALUES
  ('b1b2c3d4-0002-4000-8000-000000000001', 'São Paulo', 'a1b2c3d4-0001-4000-8000-000000000001'),
  ('b1b2c3d4-0002-4000-8000-000000000002', 'Campinas', 'a1b2c3d4-0001-4000-8000-000000000001'),
  ('b1b2c3d4-0002-4000-8000-000000000003', 'Rio de Janeiro', 'a1b2c3d4-0001-4000-8000-000000000002'),
  ('b1b2c3d4-0002-4000-8000-000000000004', 'Belo Horizonte', 'a1b2c3d4-0001-4000-8000-000000000003');

-- Marca
INSERT INTO brand (id, name) VALUES
  ('c1b2c3d4-0003-4000-8000-000000000001', 'Samsung'),
  ('c1b2c3d4-0003-4000-8000-000000000002', 'LG'),
  ('c1b2c3d4-0003-4000-8000-000000000003', 'Apple'),
  ('c1b2c3d4-0003-4000-8000-000000000004', 'Dell'),
  ('c1b2c3d4-0003-4000-8000-000000000005', 'Logitech');

-- Modelo
INSERT INTO model (id, name) VALUES
  ('d1b2c3d4-0004-4000-8000-000000000001', 'Galaxy S23'),
  ('d1b2c3d4-0004-4000-8000-000000000002', 'OLED C3'),
  ('d1b2c3d4-0004-4000-8000-000000000003', 'MacBook Pro 14'),
  ('d1b2c3d4-0004-4000-8000-000000000004', 'Inspiron 15'),
  ('d1b2c3d4-0004-4000-8000-000000000005', 'MX Master 3S');

-- Fabricante
INSERT INTO manufacturer (id, name) VALUES
  ('e1b2c3d4-0005-4000-8000-000000000001', 'Foxconn'),
  ('e1b2c3d4-0005-4000-8000-000000000002', 'Flextronics'),
  ('e1b2c3d4-0005-4000-8000-000000000003', 'Pegatron'),
  ('e1b2c3d4-0005-4000-8000-000000000004', 'Compal Electronics'),
  ('e1b2c3d4-0005-4000-8000-000000000005', 'Logitech SA');

-- Categoria
INSERT INTO category (id, name) VALUES
  ('f1b2c3d4-0006-4000-8000-000000000001', 'Eletrônicos'),
  ('f1b2c3d4-0006-4000-8000-000000000002', 'Informática'),
  ('f1b2c3d4-0006-4000-8000-000000000003', 'Acessórios'),
  ('f1b2c3d4-0006-4000-8000-000000000004', 'Periféricos'),
  ('f1b2c3d4-0006-4000-8000-000000000005', 'Áudio e Vídeo');

-- Fornecedor
INSERT INTO supplier (id, name_social_reason, name_fantasy, cnpj, code, tel, city_id, neighborhood, street, cep, number, active) VALUES
  ('11b2c3d4-0007-4000-8000-000000000001', 'Tech Distribuidora LTDA', 'TechDist', '11.111.111/0001-01', 'FRN-000001', '(11) 91111-1111', 'b1b2c3d4-0002-4000-8000-000000000001', 'Centro', 'Rua Augusta', '01310-100', '100', true),
  ('11b2c3d4-0007-4000-8000-000000000002', 'Info Supply LTDA', 'InfoSupply', '22.222.222/0001-02', 'FRN-000002', '(21) 92222-2222', 'b1b2c3d4-0002-4000-8000-000000000003', 'Botafogo', 'Rua Voluntários da Pátria', '22270-010', '200', true),
  ('11b2c3d4-0007-4000-8000-000000000003', 'MG Componentes SA', 'MG Comp', '33.333.333/0001-03', 'FRN-000003', '(31) 93333-3333', 'b1b2c3d4-0002-4000-8000-000000000004', 'Savassi', 'Av. Getúlio Vargas', '30112-021', '300', true),
  ('11b2c3d4-0007-4000-8000-000000000004', 'Digital Express LTDA', 'DigiExpress', '44.444.444/0001-04', 'FRN-000004', '(19) 94444-4444', 'b1b2c3d4-0002-4000-8000-000000000002', 'Barão Geraldo', 'Av. Albino J. B. de Oliveira', '13084-008', '400', true);

-- Cliente
INSERT INTO client (id, name, code, document, tel, city_id, neighborhood, street, cep, number, mail, active) VALUES
  ('21b2c3d4-0008-4000-8000-000000000001', 'João Silva', 'CLI-000001', '111.222.333-44', '(11) 94444-4444', 'b1b2c3d4-0002-4000-8000-000000000001', 'Vila Mariana', 'Rua Domingos de Morais', '04010-000', '50', 'joao@email.com', true),
  ('21b2c3d4-0008-4000-8000-000000000002', 'Maria Oliveira', 'CLI-000002', '555.666.777-88', '(19) 95555-5555', 'b1b2c3d4-0002-4000-8000-000000000002', 'Cambuí', 'Av. Norte-Sul', '13024-091', '150', 'maria@email.com', true),
  ('21b2c3d4-0008-4000-8000-000000000003', 'Carlos Santos', 'CLI-000003', '999.888.777-66', '(21) 96666-6666', 'b1b2c3d4-0002-4000-8000-000000000003', 'Copacabana', 'Av. Atlântica', '22070-000', '250', 'carlos@email.com', true),
  ('21b2c3d4-0008-4000-8000-000000000004', 'Ana Costa', 'CLI-000004', '123.456.789-00', '(31) 97777-7777', 'b1b2c3d4-0002-4000-8000-000000000004', 'Funcionários', 'Rua Pernambuco', '30130-150', '80', 'ana@email.com', true),
  ('21b2c3d4-0008-4000-8000-000000000005', 'Pedro Almeida', 'CLI-000005', '987.654.321-00', '(11) 98888-8888', 'b1b2c3d4-0002-4000-8000-000000000001', 'Pinheiros', 'Rua dos Pinheiros', '05422-010', '320', 'pedro@email.com', true);

-- Produto
INSERT INTO product (id, name, code, description, brand_id, model_id, category_id, manufacturer_id, measure_unit, current_stock, active) VALUES
  ('31b2c3d4-0009-4000-8000-000000000001', 'Smartphone Galaxy S23', 'PRD-000001', 'Smartphone Samsung Galaxy S23 128GB', 'c1b2c3d4-0003-4000-8000-000000000001', 'd1b2c3d4-0004-4000-8000-000000000001', 'f1b2c3d4-0006-4000-8000-000000000001', 'e1b2c3d4-0005-4000-8000-000000000001', 'UN', 50, true),
  ('31b2c3d4-0009-4000-8000-000000000002', 'TV OLED LG C3 55"', 'PRD-000002', 'Smart TV LG OLED 55 polegadas', 'c1b2c3d4-0003-4000-8000-000000000002', 'd1b2c3d4-0004-4000-8000-000000000002', 'f1b2c3d4-0006-4000-8000-000000000001', 'e1b2c3d4-0005-4000-8000-000000000002', 'UN', 20, true),
  ('31b2c3d4-0009-4000-8000-000000000003', 'MacBook Pro 14 M3', 'PRD-000003', 'Apple MacBook Pro 14 chip M3 512GB', 'c1b2c3d4-0003-4000-8000-000000000003', 'd1b2c3d4-0004-4000-8000-000000000003', 'f1b2c3d4-0006-4000-8000-000000000002', 'e1b2c3d4-0005-4000-8000-000000000003', 'UN', 15, true),
  ('31b2c3d4-0009-4000-8000-000000000004', 'Notebook Dell Inspiron 15', 'PRD-000004', 'Dell Inspiron 15 i7 16GB 512GB SSD', 'c1b2c3d4-0003-4000-8000-000000000004', 'd1b2c3d4-0004-4000-8000-000000000004', 'f1b2c3d4-0006-4000-8000-000000000002', 'e1b2c3d4-0005-4000-8000-000000000004', 'UN', 30, true),
  ('31b2c3d4-0009-4000-8000-000000000005', 'Mouse Logitech MX Master 3S', 'PRD-000005', 'Mouse sem fio Logitech MX Master 3S', 'c1b2c3d4-0003-4000-8000-000000000005', 'd1b2c3d4-0004-4000-8000-000000000005', 'f1b2c3d4-0006-4000-8000-000000000004', 'e1b2c3d4-0005-4000-8000-000000000005', 'UN', 100, true),
  ('31b2c3d4-0009-4000-8000-000000000006', 'Cabo HDMI 2.1 2m', 'PRD-000006', 'Cabo HDMI 2.1 de 2 metros', 'c1b2c3d4-0003-4000-8000-000000000002', 'd1b2c3d4-0004-4000-8000-000000000002', 'f1b2c3d4-0006-4000-8000-000000000003', 'e1b2c3d4-0005-4000-8000-000000000002', 'UN', 200, true),
  ('31b2c3d4-0009-4000-8000-000000000007', 'Teclado Mecânico RGB', 'PRD-000007', 'Teclado mecânico switches blue RGB', 'c1b2c3d4-0003-4000-8000-000000000005', 'd1b2c3d4-0004-4000-8000-000000000005', 'f1b2c3d4-0006-4000-8000-000000000004', 'e1b2c3d4-0005-4000-8000-000000000005', 'UN', 80, true);

-- Transações (Movimentações de Estoque)
-- Entradas de fornecedores
INSERT INTO stock_movements (id, product_id, type, quantity, stock_after, reason, supplier_id, client_id, created_at) VALUES
  ('41b2c3d4-0010-4000-8000-000000000001', '31b2c3d4-0009-4000-8000-000000000001', 'entrada', 50, 50, 'Compra inicial de estoque', '11b2c3d4-0007-4000-8000-000000000001', NULL, '2026-01-10 09:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000002', '31b2c3d4-0009-4000-8000-000000000002', 'entrada', 25, 25, 'Compra inicial de estoque', '11b2c3d4-0007-4000-8000-000000000002', NULL, '2026-01-10 09:30:00'),
  ('41b2c3d4-0010-4000-8000-000000000003', '31b2c3d4-0009-4000-8000-000000000003', 'entrada', 20, 20, 'Compra inicial de estoque', '11b2c3d4-0007-4000-8000-000000000003', NULL, '2026-01-11 10:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000004', '31b2c3d4-0009-4000-8000-000000000004', 'entrada', 35, 35, 'Compra inicial de estoque', '11b2c3d4-0007-4000-8000-000000000004', NULL, '2026-01-12 08:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000005', '31b2c3d4-0009-4000-8000-000000000005', 'entrada', 120, 120, 'Compra inicial de estoque', '11b2c3d4-0007-4000-8000-000000000001', NULL, '2026-01-12 08:30:00'),
  ('41b2c3d4-0010-4000-8000-000000000006', '31b2c3d4-0009-4000-8000-000000000006', 'entrada', 200, 200, 'Compra inicial de estoque', '11b2c3d4-0007-4000-8000-000000000002', NULL, '2026-01-13 09:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000007', '31b2c3d4-0009-4000-8000-000000000007', 'entrada', 100, 100, 'Compra inicial de estoque', '11b2c3d4-0007-4000-8000-000000000001', NULL, '2026-01-13 09:30:00'),
  -- Saídas para clientes
  ('41b2c3d4-0010-4000-8000-000000000008', '31b2c3d4-0009-4000-8000-000000000001', 'saida', 5, 45, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000001', '2026-02-01 14:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000009', '31b2c3d4-0009-4000-8000-000000000002', 'saida', 3, 22, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000002', '2026-02-02 15:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000010', '31b2c3d4-0009-4000-8000-000000000003', 'saida', 2, 18, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000003', '2026-02-03 10:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000011', '31b2c3d4-0009-4000-8000-000000000005', 'saida', 10, 110, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000004', '2026-02-05 11:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000012', '31b2c3d4-0009-4000-8000-000000000007', 'saida', 15, 85, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000005', '2026-02-06 16:00:00'),
  -- Mais entradas (reposição)
  ('41b2c3d4-0010-4000-8000-000000000013', '31b2c3d4-0009-4000-8000-000000000001', 'entrada', 10, 55, 'Reposição de estoque', '11b2c3d4-0007-4000-8000-000000000001', NULL, '2026-03-01 09:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000014', '31b2c3d4-0009-4000-8000-000000000003', 'saida', 3, 15, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000001', '2026-03-10 14:30:00'),
  ('41b2c3d4-0010-4000-8000-000000000015', '31b2c3d4-0009-4000-8000-000000000004', 'saida', 5, 30, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000002', '2026-03-15 10:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000016', '31b2c3d4-0009-4000-8000-000000000005', 'saida', 10, 100, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000003', '2026-03-20 11:30:00'),
  ('41b2c3d4-0010-4000-8000-000000000017', '31b2c3d4-0009-4000-8000-000000000001', 'saida', 5, 50, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000005', '2026-04-01 09:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000018', '31b2c3d4-0009-4000-8000-000000000002', 'saida', 2, 20, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000004', '2026-04-05 14:00:00'),
  ('41b2c3d4-0010-4000-8000-000000000019', '31b2c3d4-0009-4000-8000-000000000007', 'saida', 5, 80, 'Venda para cliente', NULL, '21b2c3d4-0008-4000-8000-000000000001', '2026-04-10 16:00:00');
