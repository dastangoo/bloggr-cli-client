import Ember from 'ember';

export default Ember.Controller.extend(Ember.SortableMixin, {
  queryParams: ['sortProperties', 'sortAscending', 'pageNumber', 'pageSize'],
  sortProperties: ['createdAt'],
  sortAscending: true,

  availableColumns: [
    {'title': 'Title', 'property': 'title', 'display': 'plain'},
    {'title': 'Author', 'property': 'author', 'display': 'plain'},
    {'title': 'Updated', 'property': 'updatedAt', 'display': 'date'},
    {'title': 'Created', 'property': 'createdAt', 'display': 'date'},
    {'title': 'Body', 'property': 'body', 'display': 'plain'}
  ],
  columns: Ember.computed.alias('availableColumns'),

  pageNumber: 0,
  pageSize: 10,
  possiblePageSizes: [10, 25, 50, 100],

  pages: Ember.computed('arrangedContent', 'pageSize', 'sortAscending', function(){
    var pages = [];
    var arrangedContent = this.get('arrangedContent').copy();
    while (arrangedContent.length > 0) {
      pages.push(arrangedContent.splice(0, this.get('pageSize')));
    }
    return pages;
  }),
  paginatedContent: Ember.computed('pages', 'pageNumber', function(){
    return this.get('pages')[this.get('pageNumber')]
  }),
  actions: {
    previousPage: function(){
      if(this.get('pageNumber') > 0){
        this.set('pageNumber', this.get('pageNumber') - 1);
      }
    },
    nextPage: function(){
      if(this.get('pageNumber') + 1 < this.get('pages.length')){
        this.set('pageNumber', this.get('pageNumber') + 1);
      }
    },
    changePageSize: function(newPageSize){
      var currentOffset = this.get('pageSize') * this.get('pageNumber');
      var newPageNumber = Math.floor(currentOffset / newPageSize);
      this.set('pageNumber', newPageNumber);
      this.set('pageSize', newPageSize)
    }
  }
});