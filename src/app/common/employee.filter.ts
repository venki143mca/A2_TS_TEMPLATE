import { Pipe, PipeTransform } from '@angular/core';

import { Employee } from './../employee/employee';

@Pipe({
  name: 'employeeFilter',
  pure: false
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(items: Employee[], filter: Employee): Employee[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Employee) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   * 
   * @param {Employee} employee The employee to compare to the filter.
   * @param {Employee} filter The filter to apply.
   * @return {boolean} True if employee satisfies filters, false if not.
   */
  applyFilter(employee: Employee, filter: Employee): boolean {

    for (let field in filter) {

      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (!employee[field]) {
            return false;
          }
          else if (employee[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (employee[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}