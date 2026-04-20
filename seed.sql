-- Seed: Dados fake para desenvolvimento
-- Executar direto no client do PostgreSQL

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
  ('c1b2c3d4-0003-4000-8000-000000000003', 'Apple');

-- Modelo
INSERT INTO model (id, name) VALUES
  ('d1b2c3d4-0004-4000-8000-000000000001', 'Galaxy S23'),
  ('d1b2c3d4-0004-4000-8000-000000000002', 'OLED C3'),
  ('d1b2c3d4-0004-4000-8000-000000000003', 'MacBook Pro 14');

-- Fabricante
INSERT INTO manufacturer (id, name) VALUES
  ('e1b2c3d4-0005-4000-8000-000000000001', 'Foxconn'),
  ('e1b2c3d4-0005-4000-8000-000000000002', 'Flextronics'),
  ('e1b2c3d4-0005-4000-8000-000000000003', 'Pegatron');

-- Categoria
INSERT INTO category (id, name) VALUES
  ('f1b2c3d4-0006-4000-8000-000000000001', 'Eletrônicos'),
  ('f1b2c3d4-0006-4000-8000-000000000002', 'Informática'),
  ('f1b2c3d4-0006-4000-8000-000000000003', 'Acessórios');

-- Fornecedor
INSERT INTO supplier (id, name_social_reason, name_fantasy, cnpj, tel, city_id, neighborhood, street, cep, number, active) VALUES
  ('11b2c3d4-0007-4000-8000-000000000001', 'Tech Distribuidora LTDA', 'TechDist', '11.111.111/0001-01', '(11) 91111-1111', 'b1b2c3d4-0002-4000-8000-000000000001', 'Centro', 'Rua Augusta', '01310-100', '100', true),
  ('11b2c3d4-0007-4000-8000-000000000002', 'Info Supply LTDA', 'InfoSupply', '22.222.222/0001-02', '(21) 92222-2222', 'b1b2c3d4-0002-4000-8000-000000000003', 'Botafogo', 'Rua Voluntários da Pátria', '22270-010', '200', true),
  ('11b2c3d4-0007-4000-8000-000000000003', 'MG Componentes SA', 'MG Comp', '33.333.333/0001-03', '(31) 93333-3333', 'b1b2c3d4-0002-4000-8000-000000000004', 'Savassi', 'Av. Getúlio Vargas', '30112-021', '300', true);

-- Cliente
INSERT INTO client (id, name, document, tel, city_id, neighborhood, street, cep, number, mail) VALUES
  ('21b2c3d4-0008-4000-8000-000000000001', 'João Silva', '111.222.333-44', '(11) 94444-4444', 'b1b2c3d4-0002-4000-8000-000000000001', 'Vila Mariana', 'Rua Domingos de Morais', '04010-000', '50', 'joao@email.com'),
  ('21b2c3d4-0008-4000-8000-000000000002', 'Maria Oliveira', '555.666.777-88', '(19) 95555-5555', 'b1b2c3d4-0002-4000-8000-000000000002', 'Cambuí', 'Av. Norte-Sul', '13024-091', '150', 'maria@email.com'),
  ('21b2c3d4-0008-4000-8000-000000000003', 'Carlos Santos', '999.888.777-66', '(21) 96666-6666', 'b1b2c3d4-0002-4000-8000-000000000003', 'Copacabana', 'Av. Atlântica', '22070-000', '250', 'carlos@email.com');

-- Produto
INSERT INTO product (id, name, code, description, brand_id, model_id, category_id, manufacturer_id, measure_unit, current_stock) VALUES
  ('31b2c3d4-0009-4000-8000-000000000001', 'Smartphone Galaxy S23', 'SM001', 'Smartphone Samsung Galaxy S23 128GB', 'c1b2c3d4-0003-4000-8000-000000000001', 'd1b2c3d4-0004-4000-8000-000000000001', 'f1b2c3d4-0006-4000-8000-000000000001', 'e1b2c3d4-0005-4000-8000-000000000001', 'UN', 50),
  ('31b2c3d4-0009-4000-8000-000000000002', 'TV OLED LG C3 55"', 'TV002', 'Smart TV LG OLED 55 polegadas', 'c1b2c3d4-0003-4000-8000-000000000002', 'd1b2c3d4-0004-4000-8000-000000000002', 'f1b2c3d4-0006-4000-8000-000000000001', 'e1b2c3d4-0005-4000-8000-000000000002', 'UN', 20),
  ('31b2c3d4-0009-4000-8000-000000000003', 'MacBook Pro 14 M3', 'MB003', 'Apple MacBook Pro 14 chip M3 512GB', 'c1b2c3d4-0003-4000-8000-000000000003', 'd1b2c3d4-0004-4000-8000-000000000003', 'f1b2c3d4-0006-4000-8000-000000000002', 'e1b2c3d4-0005-4000-8000-000000000003', 'UN', 15),
  ('31b2c3d4-0009-4000-8000-000000000004', 'Cabo HDMI 2.1 2m', 'CB004', 'Cabo HDMI 2.1 de 2 metros', 'c1b2c3d4-0003-4000-8000-000000000002', 'd1b2c3d4-0004-4000-8000-000000000002', 'f1b2c3d4-0006-4000-8000-000000000003', 'e1b2c3d4-0005-4000-8000-000000000002', 'UN', 200),
  ('31b2c3d4-0009-4000-8000-000000000005', 'Teclado Mecânico RGB', 'TC005', 'Teclado mecânico switches blue RGB', 'c1b2c3d4-0003-4000-8000-000000000001', 'd1b2c3d4-0004-4000-8000-000000000001', 'f1b2c3d4-0006-4000-8000-000000000003', 'e1b2c3d4-0005-4000-8000-000000000001', 'UN', 80);
