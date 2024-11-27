import { LogEntity, LogSeverityLevel } from "./log-entity";

describe('LogEntity', () => {
    

    const object = {
        message: 'test-message',
        level: LogSeverityLevel.low,
        origin: 'log-entity.test.ts'
    };


    test(' should create a log entity', () => {

        const log = new LogEntity( object );
      
        expect(log).toBeInstanceOf( LogEntity )
        expect(log.message).toBe( 'test-message' )
        expect(log.level).toBe( LogSeverityLevel.low )
        expect(log.createAt).toBeInstanceOf( Date )
        expect(log.origin).toBe( 'log-entity.test.ts' )
    });

    test('should serialize log entity to JSON', () => {
        const json = `{"level":"low","message":"Service https://google.com working","createAt":"2024-11-22T16:34:10.351Z","origin":"check.service.ts"} `
        
        const log = LogEntity.fromJson( json );

        expect(log).toBeInstanceOf( LogEntity )
        expect(log.message).toBe( 'Service https://google.com working' )
        expect(log.level).toBe( LogSeverityLevel.low )
        expect(log.createAt).toBeInstanceOf( Date )
        expect(log.origin).toBe( 'check.service.ts' )

    });

    test('should deserialize log entity from object', () => {
      
        const log = LogEntity.fromObject( object );
        
        expect(log).toBeInstanceOf( LogEntity )
        expect(log.message).toBe( 'test-message' )
        expect(log.level).toBe( LogSeverityLevel.low )
        expect(log.createAt).toBeInstanceOf( Date )
        expect(log.origin).toBe( 'log-entity.test.ts' )

    })

});