CREATE TABLE Services (
  service_id  NUMBER PRIMARY KEY,
  description VARCHAR2(200),
  price       NUMBER(10,2)
);

CREATE TABLE Trips (
  trip_id     NUMBER PRIMARY KEY,
  destination VARCHAR2(100),
  region      VARCHAR2(10) DEFAULT 'EAST',
  total_cost  NUMBER(10,2)
);

CREATE TABLE Trip_Services (
  trip_id    NUMBER REFERENCES Trips(trip_id),
  service_id NUMBER REFERENCES Services(service_id),
  PRIMARY KEY (trip_id, service_id)
);

-- EAST stores Asian destinations
INSERT INTO Services VALUES (1, 'Hotel Dubai Marina', 1100);
INSERT INTO Services VALUES (2, 'Flight to Dubai',    600);
INSERT INTO Services VALUES (3, 'Hotel Tokyo Center', 1300);
INSERT INTO Services VALUES (4, 'Flight to Tokyo',    800);
INSERT INTO Services VALUES (5, 'Hotel Bali Resort',  900);
INSERT INTO Services VALUES (6, 'Flight to Bali',     500);

INSERT INTO Trips VALUES (1, 'Dubai', 'EAST', 1700);
INSERT INTO Trips VALUES (2, 'Tokyo', 'EAST', 2100);
INSERT INTO Trips VALUES (3, 'Bali',  'EAST', 1400);

INSERT INTO Trip_Services VALUES (1, 1);
INSERT INTO Trip_Services VALUES (1, 2);
INSERT INTO Trip_Services VALUES (2, 3);
INSERT INTO Trip_Services VALUES (2, 4);
INSERT INTO Trip_Services VALUES (3, 5);
INSERT INTO Trip_Services VALUES (3, 6);

COMMIT;