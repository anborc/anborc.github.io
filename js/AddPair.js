planck.testbed('AddPair', function (testbed) {
    var pl = planck;
    var Vec2 = pl.Vec2;
    var world = new pl.World(Vec2(0, 0));
    var circle = pl.Circle(0.1);
    var box = world.createBody({ type : 'dynamic',
                                 position : Vec2(-40.0, 0.0),
                                 bullet : true
                               });
    testbed.y = 0;
    testbed.hz = 60;
    testbed.speed = 0.5;
    for (var i = 0; i < 50; i += 1) {
        var pos = Vec2(pl.Math.random(0.0, -6.0), pl.Math.random(-1.0, 1.0));
        world.createDynamicBody(pos).createFixture(circle, 0.01);
    };
    box.createFixture(pl.Box(1.5, 1.5), 1.0);
    box.setLinearVelocity(Vec2(100.0, 0.0));
    return world;
});