import { Injectable } from '@angular/core';
import { TimelineChartConfig } from '../models/timelineChartConfig.model';
import { Medication } from "../models/medication.model";
import { strict } from 'assert';

declare var google: any;

@Injectable()
export class GoogleChartService {
  constructor() {
    google.charts.load('current', {'packages':['corechart', 'timeline']});
  }

  public buildTimeline(elementId: string, medication: Array<Medication>) {
    google.charts.setOnLoadCallback(() => {
      var dt = new google.visualization.DataTable();

      // This chart does not allow more than 4 columns. 3 columns minimum excluding the 'type'
      // There must be a start/end date
      // There can only be a name. Perhaps the name of the medication AND dosage amount can be fit in the string
      // as a workaround.
      dt.addColumn({ type: 'string', id: 'type' });
      dt.addColumn({ type: 'string', id: 'Name' })
      dt.addColumn({ type: 'date', id: 'Start' });
      dt.addColumn({ type: 'date', id: 'End' });
      
      var medicationTest = Array<Medication>();
      var medication1 = new Medication('Name', new Date(2000, 3, 30), new Date(2019, 3, 2), 43);
      var medication2 = new Medication('Name2', new Date(2004, 7, 1), new Date(2017, 8, 5), 693)
      
      medicationTest.push(medication1);
      medicationTest.push(medication2);
      var rows = [];
      // 'medication' instead of medicationTest for real use
      medicationTest.forEach((medication: Medication) => {
        rows.push(["medication", medication.name + ", dosage: " + medication.dosageAmt, medication.startDate, medication.endDate]);
      });
      
      dt.addRows(rows);
      

      let timeline = new google.visualization.Timeline(document.getElementById(elementId));
      timeline.draw(dt);
    });
  }

  // public buildTimeline(elementId: string) {
  //   google.charts.setOnLoadCallback(() => {
  //     var dt = new google.visualization.DataTable();

  //     dt.addColumn({ type: 'string', id: 'Position' });
  //     dt.addColumn({ type: 'string', id: 'Name' });
  //     dt.addColumn({ type: 'date', id: 'Start' });
  //     dt.addColumn({ type: 'date', id: 'End' });
  
  //     dt.addRows([
  //       [ 'President', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
  //       [ 'President', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4) ],
  //       [ 'President', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
  //       [ 'Vice President', 'John Adams', new Date(1789, 3, 21), new Date(1797, 2, 4)],
  //       [ 'Vice President', 'Thomas Jefferson', new Date(1797, 2, 4), new Date(1801, 2, 4)],
  //       [ 'Vice President', 'Aaron Burr', new Date(1801, 2, 4), new Date(1805, 2, 4)],
  //       [ 'Vice President', 'George Clinton', new Date(1805, 2, 4), new Date(1812, 3, 20)],
  //       [ 'Secretary of State', 'John Jay', new Date(1789, 8, 25), new Date(1790, 2, 22)],
  //       [ 'Secretary of State', 'Thomas Jefferson', new Date(1790, 2, 22), new Date(1793, 11, 31)],
  //       [ 'Secretary of State', 'Edmund Randolph', new Date(1794, 0, 2), new Date(1795, 7, 20)],
  //       [ 'Secretary of State', 'Timothy Pickering', new Date(1795, 7, 20), new Date(1800, 4, 12)],
  //       [ 'Secretary of State', 'Charles Lee', new Date(1800, 4, 13), new Date(1800, 5, 5)],
  //       [ 'Secretary of State', 'John Marshall', new Date(1800, 5, 13), new Date(1801, 2, 4)],
  //       [ 'Secretary of State', 'Levi Lincoln', new Date(1801, 2, 5), new Date(1801, 4, 1)],
  //       [ 'Secretary of State', 'James Madison', new Date(1801, 4, 2), new Date(1809, 2, 3)]
  //     ]);

  //     let timeline = new google.visualization.Timeline(document.getElementById(elementId));
  //     timeline.draw(dt);
  //   });
  // }
}