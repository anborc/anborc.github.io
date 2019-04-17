planck.testbed('Apply Force', function (testbed) {
    testbed.y = -20;
    var pl = planck;
    var Vec2 = pl.Vec2;
    var world = pl.World();
    var ground = world.createBody(Vec2(0.0, 20.0));
    var wallFD = { density : 0.0, restitution : 0.4 };
    ground.createFixture(pl.Edge(Vec2(-20.0, -20.0), Vec2(-20.0, 20.0)), wallFD);
    ground.createFixture(pl.Edge(Vec2(20.0, -20.0), Vec2(20.0, 20.0)), wallFD);
    ground.createFixture(pl.Edge(Vec2(-20.0, 20.0), Vec2(20.0, 20.0)), wallFD);
    ground.createFixture(pl.Edge(Vec2(-20.0, -20.0), Vec2(20.0, -20.0)), wallFD);
    var xf1 = pl.Transform();
    xf1.q.set(Math.PI * 0.3524);
    xf1.p.set(xf1.q.getXAxis());
    var poly1 = pl.Polygon([Vec2(-1.0, 0.0), Vec2(1.0, 0.0), Vec2(0.0, 0.5)].map(pl.Transform.mulFn(xf1)));
    var xf2 = pl.Transform();
    var poly2 = pl.Polygon([Vec2(-1.0, 0.0), Vec2(1.0, 0.0), Vec2(0.0, 0.5)].map(pl.Transform.mulFn(xf2)));
    var jet = world.createBody({ type : 'dynamic',
                                 angularDamping : 2.0,
                                 linearDamping : 0.5,
                                 position : Vec2(0.0, 2.0),
                                 angle : Math.PI,
                                 allowSleep : false
                               });
    var boxFD = { density : 1.0, friction : 0.3 };
    xf2.q.set(-0.3524 * Math.PI);
    xf2.p.set(Vec2.neg(xf2.q.getXAxis()));
    jet.createFixture(poly1, 2.0);
    jet.createFixture(poly2, 2.0);
    for (var i = 0; i < 10; i += 1) {
        var box = world.createDynamicBody(Vec2(0.0, 5.0 + 1.54 * i));
        box.createFixture(pl.Box(0.5, 0.5), boxFD);
        var gravity = 10.0;
        var ii = box.getInertia();
        var mass = box.getMass();
        var radius = Math.sqrt((2.0 * ii) / mass);
        world.createJoint(pl.FrictionJoint({ collideConnected : true,
                                             maxForce : mass * gravity,
                                             maxTorque : mass * radius * gravity
                                           }, ground, box));
    };
    testbed.step = function () {
        if (testbed.activeKeys.right && bangtestbed.activeKeys.left) {
            jet.applyAngularImpulse(-0.2, true);
        } else {
            if (testbed.activeKeys.left && bangtestbed.activeKeys.right) {
                jet.applyAngularImpulse(0.2, true);
            };
        };
        if (testbed.activeKeys.up) {
            var f5 = jet.getWorldVector(Vec2(0.0, -1.0));
            var p = jet.getWorldPoint(Vec2(0.0, 2.0));
            return jet.applyLinearImpulse(f5, p, true);
        };
    };
    return world;
});