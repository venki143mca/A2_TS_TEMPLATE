"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var EmployeeFilterPipe = (function () {
    function EmployeeFilterPipe() {
    }
    EmployeeFilterPipe.prototype.transform = function (items, filter) {
        var _this = this;
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(function (item) { return _this.applyFilter(item, filter); });
    };
    /**
     * Perform the filtering.
     *
     * @param {Employee} employee The employee to compare to the filter.
     * @param {Employee} filter The filter to apply.
     * @return {boolean} True if employee satisfies filters, false if not.
     */
    EmployeeFilterPipe.prototype.applyFilter = function (employee, filter) {
        for (var field in filter) {
            if (filter[field]) {
                if (typeof filter[field] === 'string') {
                    if (!employee[field]) {
                        return false;
                    }
                    else if (employee[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                        return false;
                    }
                }
                else if (typeof filter[field] === 'number') {
                    if (employee[field] !== filter[field]) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    return EmployeeFilterPipe;
}());
EmployeeFilterPipe = __decorate([
    core_1.Pipe({
        name: 'employeeFilter',
        pure: false
    })
], EmployeeFilterPipe);
exports.EmployeeFilterPipe = EmployeeFilterPipe;
//# sourceMappingURL=employee.filter.js.map