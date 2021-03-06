'use strict';
const angular = require('angular');


export class PickupOptionsService implements IPickupOptionsService{
  promise: Object;
  PickupOption: ng.resource.IResourceClass<IPickupOption>;

  /*@ngInject*/
  constructor(PickupOption) {
    this.PickupOption = PickupOption;
    this.reload();
  }

  public reload() {
    this.promise = this.PickupOption.query();
  }

  public get() {
    return (this.promise as any).$promise;
  }

}
function PickupOptionResource($resource) {
  'ngInject';
  return $resource('/api/pickupOptions/', {}, {});
}

export default angular.module('terrappApp.PickupOptionsService', [])
  .factory('PickupOption', PickupOptionResource)
  .service('PickupOptionsService', PickupOptionsService)
  .name;
