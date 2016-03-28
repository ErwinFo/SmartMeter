var messageFull = '/XMX5LGBBFFB231169173' + '\n' + 
'1-3:0.2.8(42)' + '\n' + 
'0-0:1.0.0(160324210026W)' + '\n' +
'0-0:96.1.1(4530303034303031353733393431363134)' + '\n' +
'1-0:1.8.1(001782.944*kWh)' + '\n' +
'1-0:2.8.1(000000.000*kWh)' + '\n' +
'1-0:1.8.2(002250.977*kWh)' + '\n' +
'1-0:2.8.2(000000.000*kWh)' + '\n' +
'0-0:96.14.0(0002)' + '\n' +
'1-0:1.7.0(00.397*kW)' + '\n' +
'1-0:2.7.0(00.000*kW)' + '\n' +
'0-0:96.7.21(00002)' + '\n' +
'0-0:96.7.9(00000)' + '\n' +
'1-0:99.97.0(0)(0-0:96.7.19)' + '\n' +
'1-0:32.32.0(00001)' + '\n' +
'1-0:32.36.0(00000)' + '\n' +
'0-0:96.13.1()', + '\n' +
'0-0:96.13.0()', + '\n' +
'1-0:31.7.0(002*A)', + '\n' +
'1-0:21.7.0(00.397*kW)', + '\n' +
'1-0:22.7.0(00.000*kW)', + '\n' +
'0-1:24.1.0(003)', + '\n' +
'0-1:96.1.0(4730303233353631323233353431363134)', + '\n' +
'0-1:24.2.1(160324200000W)(03459.463*m3)', + '\n' +
'!1E24' ;


MyModel.find().distinct('_id', function(error, ids) {
    // ids is an array of all ObjectIds
});

MyModel.find().distinct('_id', function(error, ids) {
    // ids is an array of all ObjectIds
});

db.posts.find( //query today up to tonight
  {"created_on": {"$gte": new Date(2016, 7, 14), "$lt": new Date(2012, 7, 15)}})

db.measurements.findOne({$or:[{date: {$gt:"2016-01-01"}}]})

// finds one based on MongoDB Syntax, Date Constructor does not matter
db.measurements.findOne({$or: [{ date: { $gt: new Date('01/01/2016')}}]})
db.measurements.findOne({$or: [{ date: { $gt: new Date('2016-01-01')}}]})

Model.findOne({date: { $gt: new Date('01/01/2016') }}, function(err,obj) { console.log(obj); });

