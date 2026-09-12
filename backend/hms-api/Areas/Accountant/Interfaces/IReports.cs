using HMS.Areas.Accountant.Dtos;
using HMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Areas.Accountant.Interfaces
{
    public interface IReports
    {
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactions(DateTime startDate, DateTime endDate);
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactions(DateTime startDate, DateTime endDate, string PaymentMethod);
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactionsForAccounts(DateTime startDate, DateTime endDate);
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactionsForAccounts(DateTime startDate, DateTime endDate, string TransactionType);
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactionsForDrugs(DateTime startDate, DateTime endDate, string PaymentMethod);
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactionsForDrugs(DateTime startDate, DateTime endDate);
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactionsForServiceRequests(DateTime startDate, DateTime endDate);
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactionsForServiceRequests(DateTime startDate, DateTime endDate, string PaymentMethod);
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactionsForRegistration(DateTime startDate, DateTime endDate);
        Task<IEnumerable<TransactionInvoiceResponseDto>> GetTransactionsForRegistration(DateTime startDate, DateTime endDate, string PaymentMethod);
        Task<object> GetPatientInvoicesForHMO(DateTime startDate, DateTime endDate, string HMOId);
        Task<object> GetPatientInvoicesForHMO(DateTime startDate, DateTime endDate, string HMOId, string PatientId);

        Task<object> GetDrugInvoicesForHMO(DateTime startDate, DateTime endDate, string HMOId);
        Task<object> GetDrugInvoicesForHMO(DateTime startDate, DateTime endDate, string HMOId, string DrugId);

        Task<object> GetServiceInvoicesForHMO(DateTime startDate, DateTime endDate, string HMOId);
        Task<object> GetServiceInvoicesForHMO(DateTime startDate, DateTime endDate, string HMOId, string DrugId);
    }
}
