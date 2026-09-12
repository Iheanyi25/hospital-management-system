using AutoMapper;
using HMS.Areas.Nurse.Dtos;
using HMS.Areas.Nurse.Interfaces;
using HMS.Database;
using HMS.Models;
using HMS.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Areas.Nurse.Repositories
{
    public class ReportRepository : INurseReport
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationDbContext;

        public ReportRepository(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }
       
        public async Task<bool> CreateNurseReport(NurseReport NurseReport)
        {
            try
            {
                if (NurseReport == null)
                {
                    return false;
                }

                _applicationDbContext.NurseReports.Add(NurseReport);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<NurseReport> GetNurseReportById(string NurseReportId) => await _applicationDbContext.NurseReports.Where(h => h.Id == NurseReportId).Include(a => a.Nurse).FirstOrDefaultAsync();

        public async Task<NurseReportDtoForView> GetNurseReport(string NurseReportId)
        {
            var report = await _applicationDbContext.NurseReports.Where(h => h.Id == NurseReportId).Include(a => a.Nurse).FirstOrDefaultAsync();
            var ReportsToReturn = _mapper.Map<NurseReportDtoForView>(report);
            return ReportsToReturn;
        }

        public PagedList<NurseReportDtoForView> GetNurseReports(PaginationParameter paginationParameter)
        {
            var reports = _applicationDbContext.NurseReports.Include(a => a.Nurse).OrderByDescending(h => h.DateOfShift).ToList();
            var ReportsToReturn = _mapper.Map<IEnumerable<NurseReportDtoForView>>(reports);
            return PagedList<NurseReportDtoForView>.ToPagedList(ReportsToReturn.AsQueryable(), paginationParameter.PageNumber, paginationParameter.PageSize);
        }

        public PagedList<NurseReportDtoForView> GetNurseReportsByNurse(string NurseId, PaginationParameter paginationParameter)
        {
            var reports = _applicationDbContext.NurseReports.Include(a => a.Nurse).Where(a => a.NurseId == NurseId).ToList();
            var ReportsToReturn = _mapper.Map<IEnumerable<NurseReportDtoForView>>(reports);
            return PagedList<NurseReportDtoForView>.ToPagedList(ReportsToReturn.AsQueryable(), paginationParameter.PageNumber, paginationParameter.PageSize);
        }

        public async Task<bool> UpdateNurseReport(NurseReport NurseReport)
        {

            try
            {
                if (NurseReport == null)
                {
                    return false;
                }

                _applicationDbContext.NurseReports.Update(NurseReport);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
