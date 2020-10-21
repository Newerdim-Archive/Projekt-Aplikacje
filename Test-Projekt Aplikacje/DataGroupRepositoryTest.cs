using Projekt_Aplikacje.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Todo.Data;
using Xunit;

namespace Test_Projekt_Aplikacje
{
    public class DataGroupRepositoryTest : IClassFixture<DataSeedFixture>
    {
        private readonly DataSeedFixture _fixture;
        private readonly DataContext _context;
        private readonly IUnitOfWork _uow;

        public DataGroupRepositoryTest(DataSeedFixture fixture)
        {
            _fixture = fixture;
            _context = fixture.DataContext;
            _uow = new UnitOfWork(_context);
        }

        [Theory]
        [InlineData(999, 2)]
        public async void GetByIdWithUserDataAsync_UserDoesNotExists(int userId, int dataGroupId)
        {
            var dataGroup = await _uow.DataGroup.GetByIdWithUserDataAsync(dataGroupId, userId);
            Assert.False(dataGroup.Datas.Any());
        }

        [Theory]
        [InlineData(2, 999)]
        public async void GetByIdWithUserDataAsync_DataGroupDoesNotExists(int userId, int dataGroupId)
        {
            var dataGroup = await _uow.DataGroup.GetByIdWithUserDataAsync(dataGroupId, userId);
            Assert.Null(dataGroup);
        }

        [Theory]
        [InlineData(1, 1, 1)]
        public async void GetByIdWithUserDataAsync_Valid(int userId, int dataGroupId, int expected)
        {
            var dataGroup = await _uow.DataGroup.GetByIdWithUserDataAsync(dataGroupId, userId);
            Assert.Equal(expected, dataGroup.Datas.Count);
        }

        [Theory]
        [InlineData(999, "Waga")]
        public async void GetByNameWithUserDataAsync_UserDoesNotExists(int userId, string dataGroupName)
        {
            var dataGroup = await _uow.DataGroup.GetByNameWithUserDataAsync(dataGroupName, userId);
            Assert.False(dataGroup.Datas.Any());
        }

        [Theory]
        [InlineData(2, "NotFound")]
        public async void GetByNameWithUserDataAsync_DataGroupDoesNotExists(int userId, string dataGroupName)
        {
            var dataGroup = await _uow.DataGroup.GetByNameWithUserDataAsync(dataGroupName, userId);
            Assert.Null(dataGroup);
        }

        [Theory]
        [InlineData(1, "Waga", 1)]
        public async void GetByNameWithUserDataAsync_Valid(int userId, string dataGroupName, int expected)
        {
            var dataGroup = await _uow.DataGroup.GetByNameWithUserDataAsync(dataGroupName, userId);
            Assert.Equal(expected, dataGroup.Datas.Count);
        }
    }
}
