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
    public class PostnatalRepository : IPostnatal
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationDbContext;

        public PostnatalRepository(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }


        public async Task<bool> CreatePostnatal(Postnatal postnatal)
        {
            try
            {
                if (postnatal == null)
                {
                    return false;
                }

                _applicationDbContext.Postnatals.Add(postnatal);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<PostnatalDtoForView> GetPostnatal(string Postnatalid)
        {
            var postnatals = await _applicationDbContext.Postnatals.Where(h => h.Id == Postnatalid).Include(a => a.DeliveredBy).FirstOrDefaultAsync();
            var postnatalsToReturn = _mapper.Map<PostnatalDtoForView>(postnatals);
            return postnatalsToReturn;
        }

        public PagedList<PostnatalDtoForView> GetPostnatals(PaginationParameter paginationParameter)
        {
            var postnatals = _applicationDbContext.Postnatals.Include(a => a.DeliveredBy).ToList();
            var postnatalsToReturn = _mapper.Map<IEnumerable<PostnatalDtoForView>>(postnatals);
            return PagedList<PostnatalDtoForView>.ToPagedList(postnatalsToReturn.AsQueryable(), paginationParameter.PageNumber, paginationParameter.PageSize);
        }

        public async Task<bool> UpdatePostnatal(Postnatal postnatal)
        {
            try
            {
                if (postnatal == null)
                {
                    return false;
                }

                _applicationDbContext.Postnatals.Update(postnatal);
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
