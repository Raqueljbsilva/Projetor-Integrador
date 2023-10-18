-- Criando tabelas
CREATE TABLE pessoa ( 
 id_pessoa SERIAL PRIMARY KEY,  
 nome VARCHAR(15) NOT NULL,  
 sobrenome VARCHAR(15) NOT NULL,  
 telefone VARCHAR(20) NOT NULL,  
 email VARCHAR(30) UNIQUE,  
 data_nascimento DATE NOT NULL,  
 data_ultima_doacao DATE
);

CREATE TABLE grupo_sanguineo 
( 
 id_grupo_sanguineo SERIAL PRIMARY KEY,  
 tipo_de_sangue VARCHAR(3) UNIQUE 
); 

-- Relacionando a tabela pessoa com a tabela grupo_sanguineo
ALTER TABLE pessoa add COLUMN fk_id_grupo_sanguineo INT;
ALTER TABLE pessoa ADD CONSTRAINT fk_grupo_sanguineo FOREIGN KEY(fk_id_grupo_sanguineo) REFERENCES grupo_sanguineo (id_grupo_sanguineo);

-- Criando a tabela endereço
CREATE TABLE endereco 
( 
 id_endereco SERIAL PRIMARY KEY,  
 cep INT NOT NULL,  
 lograduro VARCHAR(50) NOT NULL,  
 nro INT NOT NULL,  
 bairro VARCHAR(30) NOT NULL,  
 cidade VARCHAR(30) NOT NULL,  
 estado VARCHAR(20) NOT NULL,
 fk_id_pessoa INT NOT NULL,
 CONSTRAINT fk_pessoa FOREIGN KEY (fk_id_pessoa) REFERENCES pessoa (id_pessoa)
); 

-- Criando a tabela instituições
CREATE TABLE instituicoes 
( 
 id_instituicao SERIAL PRIMARY KEY,  
 nome_instituicao VARCHAR(40) NOT NULL,  
 cidade VARCHAR(30) NOT NULL,  
 estado VARCHAR(20) NOT NULL  
); 

-- Criando a entidade associativa entre pessoas e instituições
CREATE Table doacao
(
  fk_id_pessoa INT NOT NULL,
  CONSTRAINT fk_pessoa FOREIGN KEY (fk_id_pessoa) REFERENCES pessoa (id_pessoa),
  fk_id_intituicao INT NOT NULL,
  CONSTRAINT fk_instituicoes FOREIGN KEY(fk_id_intituicao) REFERENCES instituicoes (id_instituicao)
);

-- Inserindo dados
INSERT INTO grupo_sanguineo (tipo_de_sangue) VALUES
	('A+'), ('A-'), ('B+'), ('B-'), ('AB+'), ('AB-'), ('O+'), ('O-');
    
SELECT * From grupo_sanguineo;

INSERT INTO pessoa (nome, sobrenome, telefone, email, data_nascimento, data_ultima_doacao, fk_id_grupo_sanguineo) VALUES
 ('Roberto', 'Alves', '41996402533', 'robertoalves@gmail.com', '1991-07-13', '2023-01-28', 4),
 ('Dario', 'Garcia', '65985632559', 'dariogarcia@hotmail.com', '1985-05-24', '2022-05-21', 2),
 ('Renata', 'Gomes', '71952364215', 'renatagomes@yahoo.com', '1993-01-29', '2022-08-02', 4),
 ('Tiago', 'Lopes', '95965217824', 'tiago_lopes@gmail.com', '1981-04-18', '2021-06-09', 6),
 ('Julia', 'Garcia', '22961458236', 'jgarcia@outlook.com', '1995-02-28', '2020-05-30', 8),
 ('Rebeca', 'Camargo', '47952149652', 'camargo_rebeca@gmail.com', '2001-09-25', '2023-08-05', 1);

SELECT * FROM pessoa;

Insert INTO endereco (cep, lograduro, nro, bairro, cidade, estado, fk_id_pessoa) VALUES
	(81330480, 'Rua Leonardo Javorski', 105, 'Fazendinha', 'Curitiba', 'PR', 1),
    (80330340, 'Rua Maris de Barros', 210, 'Portao', 'Curitiba', 'PR', 1),
    (78013580, 'Rua das Acacias', 456, 'Jardim das Flores', 'Cuiabá', 'MT', 2),
    (46900025, 'Avenida Jardim', 100, 'Costa Azul', 'Salvador', 'BA', 3),
    (69300258, 'Rua das Palmeiras', 65, 'Boa Vista', 'Boa Vista', 'RR', 4),
    (26530602, 'Rua dos Girassóis', 1252, 'Copacabana', 'Rio de Janeiro', 'RJ', 5),
    (26024012, 'Avenida das Roseiras', 867, 'Ipanema', 'Rio de Janeiro', 'RJ', 5),
    (88065100, 'Rua das Violetas', 456, 'Flor de Vale', 'Florianópilis', 'SC', 6);
    
SELECT * From endereco;

insert into instituicoes (nome_instituicao, cidade, estado) VALUES
	('Hemepar', 'Curitiba', 'PR'),
    ('Hemocentro Regional de Rondonópolis', 'Rondonópolis', 'MT'),
    ('Hemoba - Sede', 'Salvador', 'BA'),
    ('Hemoba - Feira de Santana', 'Feira de Santana', 'BA'),
    ('Hemoraima', 'Boa Vista', 'RR'),
    ('Hemorio', 'Campos dos Goytacazes', 'RJ');
    
SELECT * from instituicoes;

INSERT into doacao (fk_id_pessoa, fk_id_intituicao) VALUES
 (1, 1), (3, 3), (3, 4), (5, 6), (6, 1);
 
SELECT * FROM doacao;

-- Consultas juntando tabelas
SELECT nome, sobrenome, tipo_de_sangue from pessoa
INNER JOIN grupo_sanguineo
ON fk_id_grupo_sanguineo = id_grupo_sanguineo;
 
SELECT nome, sobrenome, nome_instituicao, cidade, estado FROM pessoa
inner JOIN doacao ON id_pessoa = fk_id_pessoa
INNER JOIN instituicoes ON fk_id_intituicao = id_instituicao;

