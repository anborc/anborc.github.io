planck.testbed('8 Ball', function (testbed) {
    var pl = planck;
    var Vec2 = pl.Vec2;
    var Math = pl.Math;
    var SPI4 = Math.sin(Math.PI / 4);
    var SPI3 = Math.sin(Math.PI / 3);
    var COLORED = true;
    var BLACK = { fill : 'black', stroke : 'white' };
    var WHITE = { fill : 'white', stroke : 'black' };
    var COLORS = [{ fill : '#ffdd00', stroke : '#000000' }, { fill : '#ffdd00', stroke : '#ffffff' }, { fill : '#ff3300', stroke : '#000000' }, { fill : '#ff3300', stroke : '#ffffff' }, { fill : '#662200', stroke : '#000000' }, { fill : '#662200', stroke : '#ffffff' }, { fill : '#ff8800', stroke : '#000000' }, { fill : '#ff8800', stroke : '#ffffff' }, { fill : '#00bb11', stroke : '#000000' }, { fill : '#00bb11', stroke : '#ffffff' }, { fill : '#9900ff', stroke : '#000000' }, { fill : '#9900ff', stroke : '#ffffff' }, { fill : '#0077ff', stroke : '#000000' }, { fill : '#0077ff', stroke : '#ffffff' }];
    var width = 8.0;
    var height = 4.0;
    var BALL_R = 0.12;
    var POCKET_R = 0.2;
    testbed.x = 0;
    testbed.y = 0;
    testbed.width = width * 1.2;
    testbed.height = height * 1.2;
    testbed.ratio = 100;
    testbed.mouseForce = -30;
    pl.internal.Settings.velocityThreshold = 0;
    var world = pl.World({  });
    var railH = [Vec2(POCKET_R, height * 0.5), Vec2(POCKET_R, height * 0.5 + POCKET_R), Vec2((width * 0.5 - POCKET_R / SPI4) + POCKET_R, height * 0.5 + POCKET_R), Vec2(width * 0.5 - POCKET_R / SPI4, height * 0.5)];
    var railV = [Vec2(width * 0.5, POCKET_R / SPI4 - height * 0.5), Vec2(width * 0.5 + POCKET_R, ((height * 0.5 - POCKET_R / SPI4) + POCKET_R) * -1), Vec2(width * 0.5 + POCKET_R, (height * 0.5 - POCKET_R / SPI4) + POCKET_R), Vec2(width * 0.5, height * 0.5 - POCKET_R / SPI4)];
    var railFixDef = { friction : 0.1,
                       restitution : 0.9,
                       userData : 'rail'
                     };
    var pocketFixDef = { userData : 'pocket' };
    var ballFixDef = { friction : 0.1,
                       restitution : 0.99,
                       density : 1,
                       userData : 'ball'
                     };
    var ballBodyDef = { linearDamping : 1.5, angularDamping : 1 };
    world.createBody().createFixture(pl.Polygon(railV.map(Vec2.scaleFn(1, 1))), railFixDef);
    world.createBody().createFixture(pl.Polygon(railV.map(Vec2.scaleFn(-1, 1))), railFixDef);
    world.createBody().createFixture(pl.Polygon(railH.map(Vec2.scaleFn(1, 1))), railFixDef);
    world.createBody().createFixture(pl.Polygon(railH.map(Vec2.scaleFn(-1, 1))), railFixDef);
    world.createBody().createFixture(pl.Polygon(railH.map(Vec2.scaleFn(1, -1))), railFixDef);
    world.createBody().createFixture(pl.Polygon(railH.map(Vec2.scaleFn(-1, -1))), railFixDef);
    world.createBody().createFixture(pl.Circle(Vec2(0, -height * 0.5 - POCKET_R * 1.5), POCKET_R), pocketFixDef);
    world.createBody().createFixture(pl.Circle(Vec2(0, height * 0.5 + POCKET_R * 1.5), POCKET_R), pocketFixDef);
    world.createBody().createFixture(pl.Circle(Vec2(width * 0.5 + POCKET_R * 0.7, height * 0.5 + POCKET_R * 0.7), POCKET_R), pocketFixDef);
    world.createBody().createFixture(pl.Circle(Vec2(width * 0.5 + POCKET_R * 0.7, height * 0.5 + POCKET_R * 0.7), POCKET_R), pocketFixDef);
    world.createBody().createFixture(pl.Circle(Vec2(-width * 0.5 - POCKET_R * 0.7, height * 0.5 + POCKET_R * 0.7), POCKET_R), pocketFixDef);
    world.createBody().createFixture(pl.Circle(Vec2(width * 0.5 + POCKET_R * 0.7, -height * 0.5 - POCKET_R * 0.7), POCKET_R), pocketFixDef);
    world.createBody().createFixture(pl.Circle(Vec2(-width * 0.5 - POCKET_R * 0.7, -height * 0.5 - POCKET_R * 0.7), POCKET_R), pocketFixDef);
    var balls = rack(BALL_R).map(Vec2.translateFn(width / 4, 0));
    balls.push({ x : -width / 4, y : 0 });
    if (COLORED) {
        shuffleArray(COLORS);
        for (var i = 0; i < COLORS.length; i += 1) {
            balls[i].render = COLORS[i];
        };
        balls[14].render = balls[4].render;
        balls[4].render = BLACK;
        var len = balls.length - 1;
        balls[len].render = WHITE;
    };
    for (var i = 0; i < balls.length; i += 1) {
        var ball = world.createDynamicBody(ballBodyDef);
        ball.setBullet(true);
        ball.setPosition(balls[i]);
        ball.createFixture(pl.Circle(BALL_R), ballFixDef);
        ball.render = balls[i].render;
    };
    world.on('post-solve', function (contact) {
        var _cmp43;
        var _cmp44;
        var fa = contact.getFixtureA();
        var ba = fa.getBody();
        var fb = contact.getFixtureB();
        var bb = fb.getBody();
        var pocket = (_cmp43 = pocketFixDef.userData && ba || fb.getUserData(), fa.getUserData() == _cmp43 && _cmp43 == (pocketFixDef.userData && bb));
        var ball = (_cmp44 = ballFixDef.userData && ba || fb.getUserData(), fa.getUserData() == _cmp44 && _cmp44 == (ballFixDef.userData && bb));
        return setTimeout(function () {
            return ball && pocket ? world.destroyBody(ball) : null;
        }, 1);
    });
    return world;
    function rack(r) {
        var n = 5;
        var balls2 = [];
        var d2 = r * 2;
        var l = SPI3 * d2;
        for (var i = 0; i < n; i += 1) {
            for (var j = 0; j < i + 1; j += 1) {
                balls2.push({ x : i * l + Math.random(r * 0.02), y : (j - i * 0.5) * d2 + Math.random(r * 0.02) });
            };
        };
        return balls2;
    };
    function shuffleArray(arr) {
        for (var i = 0; i < arr.length; i += 1) {
            var i1 = arr.length - i;
            var j = Math.floor(Math.random() * (i1 + 1));
            var temp = arr[i1];
            arr[i1] = arr[j];
            arr[j] = temp;
        };
        return arr;
    };
});