'use strict';
const angular = require('angular');


/*@ngInject*/
export class PickupUtilsService implements IPickupUtilsService{
  SeasonUtils: ISeasonUtilsService;
  getDateForInterval: Function;

  constructor(SeasonUtils: ISeasonUtilsService)
  {
    this.SeasonUtils = SeasonUtils;
    this.getDateForInterval = SeasonUtils.getDateForInterval;
  }

  public getStartDateFor(season: ISeason, pickupOption: IPickupOption, pickupEvent: IPickupEvent) {
    if (!pickupEvent.startDateOverride) {
      let day = this.SeasonUtils.getDateForInterval(season, pickupEvent.eventNumber);
      let startMinute = pickupOption.startMinute;
      let offsetInMinutes = (pickupOption.weekDay) * 24 * 60 + startMinute;
      return new Date(day.getTime() + offsetInMinutes * 60000);
    } else {
      return new Date(pickupEvent.startDateOverride);
    }
  }

  public getEndDateFor(season: ISeason, pickupOption: IPickupOption, pickupEvent: IPickupEvent) {
    let durationMinutes = pickupEvent.durationMinutesOverride || pickupOption.durationMinutes;
    let date = null;
    if (!pickupEvent.startDateOverride) {
      let day = this.SeasonUtils.getDateForInterval(season, pickupEvent.eventNumber);
      let startMinute = pickupOption.startMinute;
      let offsetInMinutes = (pickupOption.weekDay) * 24 * 60 + startMinute + durationMinutes;
      return new Date(day.getTime() + offsetInMinutes * 60000);
    } else {
      return new Date(new Date(pickupEvent.startDateOverride).getTime() + 60000 * durationMinutes);
    }
  }

}


export default angular.module('terrappApp.pickupUtils', [])
.service('PickupUtils', PickupUtilsService)
.name;
