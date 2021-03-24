/* ---- src: https://codepen.io/cjgammon/pen/RWpYVj?editors=0110 ---- */

var w = 1300,
    h = 1000,
    voronoi = new Voronoi(),
    bbox = {
        xl: 0,
        xr: w,
        yt: 0,
        yb: h
    },
    sites = [{
        id: 0,
        x: 50,
        y: 200
    }, {
        id: 1,
        x: 200,
        y: 250
    }, {
        id: 2,
        x: 300,
        y: 100
    }, {
        id: 3,
        x: 500,
        y: 200
    }, {
        id: 4,
        x: 500,
        y: 300
    }, {
        id: 5,
        x: 550,
        y: 350
    }],
    diagram,
    v = new Snap(w, h),
    ui = new Snap(w, h),
    colors = ['#3D9299', '#14BECC', '#00FF83', '#FF7985', '#CC1481'],
    currentColor = 0;

updateUI();
updateVoronoi();

function prettyPrint(obj) {
    console.log(JSON.stringify(obj, null, 4));
}

function getById(_id) {
    var i,
        j;

    for (i = 0; i < sites.length; i += 1) {

        if (sites[i].id == _id) {
            return sites[i];
        } else if (sites[i].collection) {

            //TODO:: loop children's children
            for (j = 0; j < sites[i].collection.length; j += 1) {
                if (sites[i].collection[j].id == _id) {
                    return sites[i].collection[j];
                }
            }

        }
    }

    return false;
}

function flatten(_s) {
    var arr = [],
        n = 0,
        j = 0;

    for (n; n < _s.length; n += 1) {
        arr.push(_s[n]);

        if (_s[n].collection) {
            for (j = 0; j < _s[n].collection.length; j += 1) {
                arr.push(_s[n].collection[j]);
            }
        }
    }

    return arr;
}

function getMask() {
    var i,
        l,
        _l,
        maskGroup,
        arr = [],
        strokeOpts = {
            'fill': 'transparent',
            'stroke-width': '100',
            'stroke-linejoin': 'round',
            'stroke-linecap': 'round',
            'stroke': 'purple'
        };

    maskGroup = v.g();

    for (i = 0; i < sites.length; i += 1) {
        arr.push(sites[i].x);
        arr.push(sites[i].y);

        if (sites[i].collection) {
            var seg = [sites[i].x, sites[i].y];

            for (j = 0; j < sites[i].collection.length; j += 1) {
                seg.push(sites[i].collection[j].x);
                seg.push(sites[i].collection[j].y);
            }

            _l = v.polyline(seg);
            _l.attr(strokeOpts);
            maskGroup.append(_l);
        }
    }

    l = v.polyline(arr);
    l.attr(strokeOpts);
    maskGroup.append(l);

    return maskGroup;
}

function updateVoronoi() {
    var i,
        line,
        l,
        mask,
        maskContent,
        vGroup,
        flattenSites;

    flattenSites = flatten(sites);

    if (flattenSites.length == 0) {
        return;
    }

    diagram = voronoi.compute(flattenSites, bbox);
    prettyPrint(diagram);
    v.clear();
    vGroup = v.g();

    for (i = 0; i < diagram.cells.length; i += 1) {
        var cell = diagram.cells[i];
        var arr = [];

        for (j = 0; j < cell.halfedges.length; j += 1) {
            start = cell.halfedges[j].getStartpoint();
            end = cell.halfedges[j].getEndpoint();

            arr.push(start.x);
            arr.push(start.y);
            arr.push(end.x);
            arr.push(end.y);
        }

        var l = v.polygon(arr);
        l.attr({
            'fill': colors[currentColor]
        });
        vGroup.append(l);

        currentColor = currentColor + 1 > colors.length - 1 ? 0 : currentColor + 1;
    }

    //mask
    maskContent = getMask();
    mask = v.mask();
    mask.attr({
        'mask-type': 'alpha'
    })
    mask.append(maskContent);
    vGroup.attr({
        'mask': mask
    });

    //depth
    var clone = vGroup.clone();
    clone.transform('translate(0, 10)');
    var satFilter = v.filter(Snap.filter.brightness(0.5));
    clone.attr({
        'filter': satFilter
    });
    clone.insertBefore(vGroup);

    //depth
    var clone2 = vGroup.clone();
    clone2.transform('translate(0, 20)');
    var satFilter2 = v.filter(Snap.filter.brightness(0.0));
    clone2.attr({
        'opacity': 0.1,
        'filter': satFilter2
    });
    clone2.insertBefore(clone);
}

function updatePaths() {
    var i;

    ui.selectAll('line').remove();

    for (i = 0; i < sites.length; i += 1) {
        if (i > 0) {
            var line = ui.line(sites[i - 1].x, sites[i - 1].y, sites[i].x, sites[i].y);
            line.attr({
                'stroke': '#efefef',
                'stroke-width': '7',
                'stroke-linejoin': 'round',
                'stroke-linecap': 'round'
            });
            childrenPaths(sites[i]);
        }
    }
}

function childrenPaths(_s) {
    var i;

    if (_s.collection) {
        for (i = 0; i < _s.collection.length; i += 1) {
            if (i == 0) {
                var line = ui.line(_s.x, _s.y, _s.collection[i].x, _s.collection[i].y);
            } else {
                var line = ui.line(_s.collection[i - 1].x, _s.collection[i - 1].y, _s.collection[i].x, _s.collection[i].y);
            }
            line.attr({
                'stroke': '#efefef',
                'stroke-width': '7',
                'stroke-linejoin': 'round',
                'stroke-linecap': 'round'
            });
            childrenPaths(_s.collection[i]);
        }
    }
}

function updateChildren(_s, id) {
    var i;

    if (_s.collection) {

        for (i = 0; i < _s.collection.length; i += 1) {
            var s = _s.collection[i];

            var site = ui.circle(s.x, s.y, 20);
            site.attr({
                'vId': id + '_' + i,
                'cursor': 'pointer',
                'fill': '#333'
            });

            updateChildren(s, id + '_' + i);
        }
    }
}

function updateUI() {
    var i;

    ui.clear();

    var rect = ui.rect(0, 0, w, h);
    rect.attr('fill', 'transparent');

    for (i = 0; i < sites.length; i += 1) {
        var s = sites[i];

        var site = ui.circle(s.x, s.y, 20);
        site.attr({
            'vId': i,
            'cursor': 'pointer',
            'fill': '#333'
        });

        updateChildren(s, i);
    }

    updatePaths();
}