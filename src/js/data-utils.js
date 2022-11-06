function makeDataId() {
  return `${Date.now()}:${Math.random().toString().substr(2)}`;
}
function makeDefaultData() {
  return [
    {
      id: makeDataId(),
      title: "Item 1",
      tags: ["tag 1", "tag 2"],
      date: "2020-03-02T17:32:00.000Z",
    },
    {
      id: makeDataId(),
      title: "Item 2",
      tags: [],
      date: "2020-01-20T13:12:00.000Z",
    },
    {
      id: makeDataId(),
      title: "Item 3",
      tags: ["tag tag tag", "tag 1"],
      date: "2020-02-11T08:42:00.000Z",
    },
    {
      id: makeDataId(),
      title: "Item 4 and text",
      tags: [],
      date: "2020-01-01T00:00:00.000Z",
    },
    {
      id: makeDataId(),
      title: "Item 5",
      tags: ["tag 3", "tag 4", "tag 1", "tag 10", "tag 50", "tag tag 22"],
      date: "2020-04-21T09:11:00.000Z",
    },
  ];
}
