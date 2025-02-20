using CustomerWebApi.Data;
using CustomerWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerWebApi.Repositories
{
    public class CustomerRepository: ICustomerRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Customer> _dbSet;

        public CustomerRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Customer>();
        }

        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            return await _dbSet.Include(c => c.CustomerAddresses).ToListAsync();
        }

        public async Task<Customer?> GetByIdAsync(int id)
        {
            var customer =  await _dbSet.Include(c => c.CustomerAddresses).FirstOrDefaultAsync(c => c.CustomerId == id);
            return customer;

        }

        public async Task AddAsync(Customer entity)
        {
            _dbSet.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Customer entity)
        {

            var existingCustomer = await _context.Customers.Include(c => c.CustomerAddresses).FirstOrDefaultAsync(c => c.CustomerId == entity.CustomerId);

            if (existingCustomer != null)
            {
                _context.Entry(existingCustomer).CurrentValues.SetValues(entity);

                var addressesToRemove = existingCustomer.CustomerAddresses.Where(a => !entity.CustomerAddresses.Any(ca => ca.CustomerAddressId == a.CustomerAddressId)).ToList();

                foreach (var address in addressesToRemove)
                {
                    _context.CustomerAddresses.Remove(address);
                }

                foreach (var address in entity.CustomerAddresses)
                {
                    var existingAddress = existingCustomer.CustomerAddresses.FirstOrDefault(a => a.CustomerAddressId == address.CustomerAddressId);
                    if (existingAddress != null)
                    {
                        // Update existing address
                        _context.Entry(existingAddress).CurrentValues.SetValues(address);
                    }
                    else
                    {
                        // Add new address
                        existingCustomer.CustomerAddresses.Add(address);
                    }
                }
            }
          
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }

}
