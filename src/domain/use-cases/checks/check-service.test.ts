import { LogEntity } from "../../entities/log-entity";
import { CheckService } from "./check-service";

describe('Checkservice useCase', () => {


    const mockRepository = {
        saveLogs: jest.fn(),
        getLogs: jest.fn()
    }

    const succesCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        succesCallback,
        errorCallback,
        mockRepository
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('should call successCallbacks when fetch returns true', async() => {


        const wasOk = await checkService.execute('https://google.com')


        expect(wasOk).toBe(true);

        expect(succesCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect( mockRepository.saveLogs ).toHaveBeenCalledWith(
            expect.any( LogEntity )
        )

    })

    test('should call errorCallback when fetch returns false', async() => { 

        const wasOk = await checkService.execute('https://invalid.url')

        expect(wasOk).toBe(false);

        expect(succesCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository.saveLogs ).toHaveBeenCalledWith(
            expect.any( LogEntity )
        );

    })
});