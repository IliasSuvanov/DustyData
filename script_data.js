
const search = instantsearch({
    indexName: 'opis_data',
    searchClient: algoliasearch(
      '40URO6292P',
      '524411a08e174dd520989209dd9a1d7d'
    ),
  });

  // Add widgets
  // ...


  /* ---------- */
  /* Search Box */
  /* ---------- */
search.addWidget(
instantsearch.widgets.searchBox({
    container: '#ais-widget-search-box',
    placeholder: 'Search by keywords, delo, description etc',
    showSubmit: true,
    showReset: true,
    searchAsYouType: true,
    showLoadingIndicator: false,
    // queryHook: function(query, searchInstance) {
    // const queryCleaned = checkForEIN(query);
    // readyToSearchScrollPosition();
    // searchInstance(queryCleaned);
    // initTooltips();
    // },
}),
);


const templateHits = `
        <div class="row row-grant-names">
        <div class="col s12 m6">
          <span class="text-bold">{{#helpers.highlight}}{ "attribute": "Description_of_data" }{{/helpers.highlight}}</span>
        </div>
          <div class="col s12 m5">
          <a class="truncate text-light" title="Data web-link">{{ Delo }}</a>
          </div>
          <div class="col m1 hide-on-small-only">
          <div class="actions-wrapper center-align">
              <a class="text-bold">
                <span class="text-bold">
                <a class="truncate text-light" href="{{Link}}" title="Link">View</a>
                </span>
              </a>
          </div>
        </div>
      </div>

      <div class="row">
      <div class="col s12 m6">
      </div>
      <div class="col s12 m5">
      <span class="small text-light">
          <p>Opis: {{ Opis }} </p>
          <p>Year: {{Date}}</p>

      </span>
      </div>
      </div>

      `;




search.addWidget(
    instantsearch.widgets.hits({
      container: '#ais-widget-hits',
      templates: {
        item: templateHits,
      },
      cssClasses: {
        root: '',
        list: 'striped row',
        item: ['col', 's12', 'li-grants-search'],
      },
    //   transformItems(items) {
    //     return items.map(item => ({
    //       ...item,
    //       'grant_amount': `$${item.grant_amount.toLocaleString()}`,
    //     }));
    //   },
    }),
  );

/* ---------- */
/* Pagination */
/* ---------- */
search.addWidget(
instantsearch.widgets.pagination({
    'container': '#ais-widget-pagination',
    'maxPages': 20,
    'scrollTo': '.nav-search',
    'cssClasses': {
    'root': 'pagination',
    'page': 'waves-effect',
    'selectedItem': 'active',
    'disabledItem': 'disabled',
    },
}),
);



search.addWidget(
    instantsearch.widgets.poweredBy({
      'container': '#powered-by',
    }),
  );



const templateStats = `  {{#hasNoResults}}No results{{/hasNoResults}}
{{#hasOneResult}}1 result{{/hasOneResult}}
{{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}
<!--<span class="small text-muted-max">found in {{processingTimeMS}}ms</span>-->`;


search.addWidget(
instantsearch.widgets.stats({
    container: '#ais-widget-stats',
    templates: {
    text: templateStats,
    },
    cssClasses: {
    text: 'text-muted',
    },
}),
);




/* Create desktop refinements */


const FondList = instantsearch.widgets.panel({
  templates: {
    header: '<i class="fa fa-chevron-right"></i>Fond',
  },
  cssClasses: {
    header: 'panel-header',
  },
})(instantsearch.widgets.refinementList);


search.addWidget(
      FondList({
        container: `#ais-widget-refinement-list--Fond`,
        attribute: 'Fond',
        limit: 8,
        showMore: true,
        showMoreLimit: 20,
        cssClasses: {
        checkbox: 'filled-in',
        labelText: 'small',
        count: ['right', 'small'],
        showMore: 'btn-flat blue-grey-text small',
        disabledShowMore: 'hidden',
        },
        templates: {
        showMoreText: `  {{#isShowingMore}}
        [ - ] Showing top 20 results
      {{/isShowingMore}}
      {{^isShowingMore}}
        [ + ] Show top 20 results
      {{/isShowingMore}}`,
        },
    }),
    );


// search.addWidget(
//     instantsearch.widgets.refinementList({
//         container: `#ais-widget-refinement-list--Main_unit_of_observation`,
//         attribute: 'Main_unit_of_observation',
//         limit: 8,
//         showMore: true,
//         showMoreLimit: 20,
//         cssClasses: {
//         checkbox: 'filled-in',
//         labelText: 'small',
//         count: ['right', 'small'],
//         showMore: 'btn-flat blue-grey-text small',
//         disabledShowMore: 'hidden',
//         },
//         templates: {
//         showMoreText: `  {{#isShowingMore}}
//         [ - ] Showing top 20 results
//         {{/isShowingMore}}
//         {{^isShowingMore}}
//         [ + ] Show top 20 results
//         {{/isShowingMore}}`,
//         },
//     }),
//     );










// search.addWidget(
//   instantsearch.widgets.refinementList({
//       attribute: 'Country',
//       limit: 8,
//       showMore: true,
//       showMoreLimit: 20,
//       cssClasses: {
//       header: 'panel-header',
//       checkbox: 'filled-in',
//       labelText: 'small',
//       count: ['right', 'small'],
//       showMore: 'btn-flat blue-grey-text small',
//       disabledShowMore: 'hidden',
//       },
//       templates: {
//       showMoreText: `  {{#isShowingMore}}
//       [ - ] Showing top 20 results
//       {{/isShowingMore}}
//       {{^isShowingMore}}
//       [ + ] Show top 20 results
//       {{/isShowingMore}}`,
//       },
//   }),
//   );




/* ----------------- */
/* Clear Refinements */
/* ----------------- */
search.addWidget(
    instantsearch.widgets.clearRefinements({
        container: '#ais-widget-clear-all',
        cssClasses: {
        button: ['btn blue-grey white-text waves-effect waves-light'],
        },
        templates: {
        resetLabel: 'Clear filters',
        },
    }),
    );







search.start();



