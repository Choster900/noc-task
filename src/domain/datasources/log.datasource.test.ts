import { LogEntity, LogSeverityLevel } from "../entities/log-entity";
import { LogDataSource } from "./log.datasource";

describe('log.datasource.ts', () => {


    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
        createAt: new Date()
    });

    class MockLogDatasource implements LogDataSource {

        async saveLogs(logEntity: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }

    }

    test('should test the abstract class', async() => {

        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf( MockLogDatasource)
        expect( typeof mockLogDatasource.saveLogs ).toBe('function')
        expect( typeof mockLogDatasource.getLogs ).toBe('function')

        await mockLogDatasource.saveLogs( newLog )
        const logs = await mockLogDatasource.getLogs( LogSeverityLevel.low );
        
        expect( logs ).toHaveLength( 1 );
        expect ( logs[ 0 ]).toBeInstanceOf( LogEntity )

    });

});