# Customer Project - Data Noesis

#Requirements
- .NET Core SDK
- Node.js and npm
- SQL Server

#Ports
- Web API : 8081 (https), 5001 (http)
- React App : 3000 (http)

# Db Scripts (Sql Server)
 
CREATE TABLE Customers (
    CustomerId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
	Phone NVARCHAR(10) NOT NULL);



CREATE TABLE CustomerAddresses (
    CustomerAddressId INT IDENTITY(1,1) PRIMARY KEY,
    Address NVARCHAR(200) NOT NULL,
    City NVARCHAR(100) NOT NULL,
    ZipCode NVARCHAR(100) NOT NULL,
    CustomerId INT NOT NULL,
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId) ON DELETE CASCADE
);