namespace CustomerWebApi.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public ICollection<CustomerAddress> CustomerAddresses { get; set; }

    }
}
