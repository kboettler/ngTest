export class UtoRequest {
    id: number;
    employeeId: number;
    day: Date;
    hours: number;

    constructor(employee: number, d: Date, h: number) {
        this.id = 0;
        this.employeeId = employee;

        this.day = d;
        this.hours = h;
    }
}
