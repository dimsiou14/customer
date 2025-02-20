using Microsoft.AspNetCore.Mvc;
using CustomerWebApi.Models;
using CustomerWebApi.Repositories;

namespace CustomerWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly ILogger<CustomersController> _logger;

        public CustomersController(ICustomerRepository customerRepository,
                                   ILogger<CustomersController> logger)
        {
            _customerRepository = customerRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            try
            {
              
                return Ok(await _customerRepository.GetAllAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Get Customers, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            try
            {
                var customer = await _customerRepository.GetByIdAsync(id);
                if (customer == null)
                {
                    return NotFound();
                }
                return Ok(customer);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Get Customer, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            try
            {

                await _customerRepository.AddAsync(customer);

                var savedCustomer = await _customerRepository.GetByIdAsync(customer.CustomerId);
                if (savedCustomer == null)
                {
                    return NotFound();
                }
                return Ok(savedCustomer);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Post Customer, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            try
            {
                if (id != customer.CustomerId)
                {
                    return BadRequest();
                }

                await _customerRepository.UpdateAsync(customer);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Put Customer, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            try
            {
                await _customerRepository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to Delete Customer, exception : {0}", ex);
                return StatusCode(500, "Internal server error");
            }
        }
    }

}
