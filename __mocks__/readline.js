module.exports = {
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn()
      .mockImplementationOnce((questionText, cb) => { cb('1/1/2021 2/2/2021') })
      .mockImplementationOnce((questionText, cb) => { cb('1/1/2021 to 2/2/2021') })
      .mockImplementationOnce((questionText, cb) => { cb('1/1/2021 - 2/2/2021') })
      .mockImplementationOnce((questionText, cb) => { cb('1/1/2021 and 2/2/2021') })
      .mockImplementationOnce((questionText, cb) => { cb('  1/1/2021 and   2/2/2021    ') }),
    on: jest.fn()
      .mockImplementation((event, listener) => { })
  })
};