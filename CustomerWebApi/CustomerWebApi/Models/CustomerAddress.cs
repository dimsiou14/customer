﻿namespace CustomerWebApi.Models
{
    public class CustomerAddress
    {
        public int CustomerAddressId { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public int CustomerId { get; set; }

    }
}
