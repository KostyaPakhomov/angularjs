angular
  .module("app", ["templates"])
  .run([
    "$rootScope",
    function ($rootScope) {
      $rootScope.data = makeDefaultData();
      $rootScope.selectedItemData = {
        id: null,
        title: "",
        tags: [],
        date: "",
      };
    },
  ])
  .directive("app", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/app.tpl.html",
    };
  })
  .directive("contentView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/content-view.tpl.html",
      controller: ["$scope", "$rootScope", contentViewController],
    };
    function contentViewController($scope, $rootScope) {
      $scope.data = $rootScope.data;
      $scope.dataFilter = [...$scope.data];
      $scope.onlyDate = false;
      $scope.search;
      $scope.select;
      $scope.newTitle;
      $scope.changeCheckbox = function (isOnlyDate) {
        $scope.onlyDate = isOnlyDate ? true : false;
      };
      $scope.changeSelect = function (type) {
        switch (type) {
          case "title":
            $scope.dataFilter = $scope.data.sort((a, b) =>
              a.title > b.title ? 1 : -1
            );
            break;
          case "date":
            $scope.dataFilter = $scope.data.sort((a, b) =>
              new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1
            );
            break;
        }
      };
      $scope.searchValue = function (value) {
        $scope.dataFilter = $scope.data.filter((val) =>
          val.title.toLowerCase().includes(value.toLowerCase())
        );
      };
      $scope.addNewTitle = function (value) {
        $scope.search = "";
        $scope.select = "";
        $scope.data.push($scope.createNewItem(value));
        $scope.dataFilter = [...$scope.data];
      };
      $scope.createNewItem = function (value) {
        return {
          id: makeDataId(),
          title: value,
          tags: [],
          date: new Date(Date.now()).toISOString(),
        };
      };
      $scope.setObjectParams = function (obj) {
        $rootScope.selectedItemData = { ...obj };
      };
    }
  })
  .directive("sidebarView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/sidebar-view.tpl.html",
      controller: ["$scope", "$rootScope", sidebarController],
    };
    function sidebarController($scope, $rootScope) {
      $scope.newTag;
      $scope.addNewTag = function (value) {
        $scope.selectedItemData.tags.push(value);
        $rootScope.selectedItemData = { ...$scope.selectedItemData };
        $scope.newTag = "";
      };
      $scope.removeTag = function (index) {
        $scope.selectedItemData.tags.splice(index, 1);
        $rootScope.selectedItemData = { ...$scope.selectedItemData };
      };

      $scope.selectedItemData = { ...$rootScope.selectedItemData };

      $rootScope.$watch("selectedItemData.title", function (newVal, oldVal) {
        $scope.selectedItemData = { ...$rootScope.selectedItemData };
      });
    }
  })
  .directive("elementsView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/elements-view.tpl.html",
      controller: ["$scope", "$element", elementsViewCtrl],
    };
    function elementsViewCtrl($scope, $element) {
      $scope.model = {
        width: 300,
      };
      $scope.setWidth = () => {
        let width = $scope.model.width;
        if (!width) {
          width = 1;
          $scope.model.width = width;
        }
        $element.css("width", `${width}px`);
      };
      $scope.setWidth();
    }
  })
  .directive("some1", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-2></some-2>",
    };
  })
  .directive("some2", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-3></some-3>",
    };
  })
  .directive("some3", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<summary-view></summary-view>",
    };
  })
  .directive("summaryView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/summary-view.tpl.html",
      controller: ["$scope", "$rootScope", summaryController],
    };
    function summaryController($scope, $rootScope) {
      $scope.data = [];
      $scope.uniqueTags = "";
      $rootScope.$watch("data.length", function (newVal, oldVal) {
        $scope.data = [...$rootScope.data];
        $scope.uniqueTags = [
          ...new Set($scope.data.map((el) => el.tags).flat()),
        ].join(", ");
      });
      $rootScope.$watch(
        "selectedItemData.tags.length",
        function (newVal, oldVal) {
          $scope.uniqueTags = [
            ...new Set($scope.data.map((el) => el.tags).flat()),
          ].join(", ");
        }
      );
    }
  });
