planck.testbed('Bridge', function (testbed) {
    var pl = planck;
    var Vec2 = pl.Vec2;
    var world = new pl.World(Vec2(0, -4));
    var count = 30;
    var middle = null;
    var ground = world.createBody();
    var bridgeRect = pl.Box(0.5, 0.125);
    var bridgeFD = { density : 20.0, friction : 0.2 };
    ground.createFixture(pl.Edge(Vec2(-40.0, 0.0), Vec2(40.0, 0.0)), 0.0);
    var prevBody = ground;
    for (var i = 0; i < count; i += 1) {
        var body = world.createDynamicBody(Vec2(-14.5 + i, 5.0));
        var anchor = Vec2(-15.0 + i, 5.0);
        body.createFixture(bridgeRect, bridgeFD);
        world.createJoint(pl.RevoluteJoint({  }, prevBody, body, anchor));
        if (i * 2 == count) {
            middle = body;
        };
        prevBody = body;
    };
    var anchor5 = Vec2(-15.0 + count, 5.0);
    world.createJoint(pl.RevoluteJoint({  }, prevBody, ground, anchor5));
    for (var i = 0; i < 2; i += 1) {
        var body2 = world.createDynamicBody(Vec2(i * 8.0 - 8.0, 12.0));
        var vertices = [Vec2(-0.5, 0.0), Vec2(0.5, 0.0), Vec2(0.0, 1.5)];
        body2.createFixture(pl.Polygon(vertices), 1.0);
    };
    var shape = pl.Circle(0.5);
    for (var i = 0; i < 30; i += 1) {
        var body3 = world.createDynamicBody(Vec2(i * 2.0 - 2.0, 10.0));
        body3.createFixture(shape, 1.0);
    };
    return world;
});