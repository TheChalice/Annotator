/* Main page dispatcher.
*/
requirejs(['app/index',
           'app/edit',
           'helper/colormap',
           'helper/util'],
function(indexPage, editPage, colormap, util) {
  var dataURL = "data/example.json",  // Change this to another dataset.
      params = util.getQueryParams();

  // Create a colormap for display. The following is an example.
  function createColormap(label, labels) {
    return (label) ?
      colormap.create("single", {
        size: labels.length,
        index: labels.indexOf(label)
      }) :
      [[255, 255, 255],
       [226, 196, 196],
       [64, 32, 32]].concat(colormap.create("hsv", {
        size: labels.length - 3
      }));
  }

  // Load dataset before rendering a view.
  function renderPage(renderer) {
      //console.log('params', params);
      params.id = 1
      util.requestJSON(dataURL, function(data) {

      //console.log('data', data);
      data.colormap = createColormap(params.label, data.labels);
      renderer(data, params);
    });
  }

  switch(params.view) {
    case "index":
      renderPage(editPage);
      break;
    case "edit":
      renderPage();
      break;
    default:
      params.view = "index";
      window.location = util.makeQueryParams(params);
      break;
  }
});
