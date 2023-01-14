/**
 * @jest-environment jsdom
 */
import moment from 'moment';
import { Status } from '../src/Status';
import { StatusConfiguration } from '../src/StatusConfiguration';

jest.mock('obsidian');
window.moment = moment;

describe('Status', () => {
    describe('default configurations', () => {
        expect(Status.DONE.configuration.previewText()).toEqual("- [x] Done, next status is ' '. ");
        expect(Status.EMPTY.configuration.previewText()).toEqual("- [] EMPTY, next status is ''. ");
        expect(Status.TODO.configuration.previewText()).toEqual("- [ ] Todo, next status is 'x'. ");
    });

    it('factory methods for default statuses', () => {
        expect(Status.makeDone().configuration.previewText()).toEqual("- [x] Done, next status is ' '. ");
        expect(Status.makeEmpty().configuration.previewText()).toEqual("- [] EMPTY, next status is ''. ");
        expect(Status.makeTodo().configuration.previewText()).toEqual("- [ ] Todo, next status is 'x'. ");
        expect(Status.makeCancelled().configuration.previewText()).toEqual("- [-] Cancelled, next status is ' '. ");
        expect(Status.makeInProgress().configuration.previewText()).toEqual("- [/] In Progress, next status is 'x'. ");
    });

    it('should initialize with valid properties', () => {
        // Arrange
        const indicator = '/';
        const name = 'In Progress';
        const next = 'x';

        // Act
        const status = new Status(new StatusConfiguration(indicator, name, next, false));

        // Assert
        expect(status).not.toBeNull();
        expect(status!.indicator).toEqual(indicator);
        expect(status!.name).toEqual(name);
        expect(status!.nextStatusIndicator).toEqual(next);
        expect(status!.isCompleted()).toEqual(false);
    });

    it('should be complete when indicator is "x"', () => {
        // Arrange
        const indicator = 'x';
        const name = 'Done';
        const next = ' ';

        // Act
        const status = new Status(new StatusConfiguration(indicator, name, next, false));

        // Assert
        expect(status).not.toBeNull();
        expect(status!.indicator).toEqual(indicator);
        expect(status!.name).toEqual(name);
        expect(status!.nextStatusIndicator).toEqual(next);
        expect(status!.isCompleted()).toEqual(true);
    });

    it('should construct a Status for unknown symbol', () => {
        // Arrange
        const indicator = 'U';

        // Act
        const status = Status.createUnknownStatus(indicator);

        // Assert
        expect(status).not.toBeNull();
        expect(status!.indicator).toEqual(indicator);
        expect(status!.name).toEqual('Unknown');
        expect(status!.nextStatusIndicator).toEqual('x');
        expect(status!.isCompleted()).toEqual(false);
    });
});
