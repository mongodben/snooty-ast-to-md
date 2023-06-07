# db.collection.find()

## Definition

`db.collection.find(query, projection, options)`db.collection.find()[`find`](https://www.mongodb.com/docs/manual/reference/command/find/#mongodb-dbcommand-dbcmd.find) commandThis page documents a [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) method. This is *not*
the documentation for database commands or language-specific drivers,
such as Node.js.

For the database command, see the [`find`](https://www.mongodb.com/docs/manual/reference/command/find/#mongodb-dbcommand-dbcmd.find) command.

For MongoDB API drivers, refer to the language-specific
MongoDB driver documentation.

For the legacy `mongo` shell documentation, refer to the
documentation for the corresponding MongoDB Server release:

mongo shell v4.4

Selects documents in a collection or view and returns a
[cursor](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-cursor) to the selected documents.

- - Parameter


- Type


- Description


- - [query](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-method-find-query)


- document


- Optional. Specifies selection filter using [query
operators](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-projection-operators-top). To return all
documents in a collection, omit this parameter or pass an
empty document (`{}`).


- - [projection](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-method-find-projection)


- document


- Optional. Specifies the fields to return in the documents that match the
query filter. To return all fields in the matching documents, omit this
parameter.  For details, see [Projection](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-projection).


- - [options](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-method-find-options)


- document


- Optional. Specifies additional options for the query. These options
modify query behavior and how results are returned. To see available
options, see FindOptions.

A [cursor](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-cursor) to the documents that match the `query`
criteria. When the [`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) method
"returns documents," the method is actually returning a cursor to
the documents.



## Behavior

Projection### Projection

Starting in MongoDB 4.4, as part of making
[`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) and
[`findAndModify()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.findAndModify/#mongodb-method-db.collection.findAndModify) projection consistent with
aggregation's [`$project`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/#mongodb-pipeline-pipe.-project) stage,

- The [`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) and
[`findAndModify()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.findAndModify/#mongodb-method-db.collection.findAndModify) projection can accept
[aggregation expressions and syntax](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions).


- MongoDB enforces additional restrictions with regards to
projections. See [Projection Restrictions](https://www.mongodb.com/docs/manual/reference/limits/#mongodb-limit-Projection-Restrictions) for details.

The `projection` parameter determines which fields are returned in
the matching documents. The `projection` parameter takes a document
of the following form:

```javascript
{ <field1>: <value>, <field2>: <value> ... }
```

- - Projection


- Description


- - `<field>: <1 or true>`


- Specifies the inclusion of a field. If you specify a non-zero
integer for the projection value, the operation treats the
value as `true`.


- - `<field>: <0 or false>`


- Specifies the exclusion of a field.


- - `"<field>.$": <1 or true>`


- Uses the [`$`](https://www.mongodb.com/docs/manual/reference/operator/projection/positional/#mongodb-projection-proj.-) array projection operator to return
the first element that matches the query condition on the
array field. If you specify a non-zero integer for the
projection value, the operation treats the value as `true`.

Not available for [views](https://www.mongodb.com/docs/manual/core/views/#std-label-views-landing-page).


- - `<field>: <array projection>`


- Uses the array projection operators ([`$elemMatch`](https://www.mongodb.com/docs/manual/reference/operator/projection/elemMatch/#mongodb-projection-proj.-elemMatch),
[`$slice`](https://www.mongodb.com/docs/manual/reference/operator/projection/slice/#mongodb-projection-proj.-slice)) to specify the array elements to
include.

Not available for [views](https://www.mongodb.com/docs/manual/core/views/#std-label-views-landing-page).


- - `<field>: <$meta expression>`


- Uses the [`$meta`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/meta/#mongodb-expression-exp.-meta) operator expression to specify
the inclusion of available [`per-document metadata`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/meta/#mongodb-expression-exp.-meta).

Not available for [views](https://www.mongodb.com/docs/manual/core/views/#std-label-views-landing-page).


- - `<field>: <aggregation expression>`


- Specifies the value of the projected field.

Starting in MongoDB 4.4, with the use of [aggregation
expressions and syntax](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions), including
the use of literals and aggregation variables, you can project
new fields or project existing fields with new values.

- If you specify a non-numeric, non-boolean literal (such as a
literal string or an array or an operator expression) for
the projection value, the field is projected with the new
value, for example:

- `{ field: [ 1, 2, 3, "$someExistingField" ] }`


- `{ field: "New String Value" }`


- `{ field: { status: "Active", total: { $sum: "$existingArray" } } }`


- To project a literal value for a field, use the
[`$literal`](https://www.mongodb.com/docs/manual/reference/operator/aggregation/literal/#mongodb-expression-exp.-literal) aggregation expression; for example:

- `{ field: { $literal: 5 } }`


- `{ field: { $literal: true } }`


- `{ field: { $literal: { fieldWithValue0: 0, fieldWithValue1: 1 } } }`

In versions 4.2 and earlier, any specification value (with
the exception of the [previously unsupported document
value](https://www.mongodb.com/docs/manual/release-notes/4.4/#std-label-4.4-projection)) is treated as either `true`
or `false` to indicate the inclusion or exclusion of
the field.

#### Embedded Field Specification

For fields in an embedded documents, you can specify the field using
either:

- [dot notation](https://www.mongodb.com/docs/manual/core/document/#std-label-document-dot-notation-embedded-fields), for example `"field.nestedfield": <value>`


- nested form, for example `{ field: { nestedfield: <value> } }` (*Starting in
MongoDB 4.4*)



#### `_id` Field Projection

The `_id` field is included in the returned documents by default unless
you explicitly specify `_id: 0` in the projection to suppress the field.



#### Inclusion or Exclusion

A `projection` *cannot* contain *both* include and exclude
specifications, with the exception of the `_id` field:

- In projections that *explicitly include* fields, the `_id` field is
the only field that you can *explicitly exclude*.


- In projections that *explicitly excludes* fields, the `_id` field
is the only field that you can *explicitly include*; however, the
`_id` field is included by default.

See [Projection Examples](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-projection-examples).





### Cursor Handling

Executing [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) in [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)
automatically iterates the cursor to display up to the first 20
documents. Type `it` to continue iteration.

To access the returned documents with a driver, use the appropriate
cursor handling mechanism for the driver language.

- [Iterate the Returned Cursor](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-crud-read-cursor)


- [Modify the Cursor Behavior](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-modify-cursor)


- [Available `mongosh` Cursor Methods](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-cursor-methods)



### Read Concern

To specify the [read concern](https://www.mongodb.com/docs/manual//reference/read-concern/#) for
[`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find), use the [`cursor.readConcern()`](https://www.mongodb.com/docs/manual/reference/method/cursor.readConcern/#mongodb-method-cursor.readConcern)
method.

Type Bracketing

### Type Bracketing

MongoDB treats some data types as equivalent for comparison purposes.
For instance, numeric types undergo conversion before comparison. For
most data types, however,
[comparison operators](https://www.mongodb.com/docs/manual//reference/operator/query-comparison/#) only
perform comparisons on documents where the
[BSON type](https://www.mongodb.com/docs/manual/reference/bson-type-comparison-order/#std-label-bson-types-comparison-order) of the
target field matches the type of the query operand. Consider the
following collection:

```javascript
{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }
{ "_id": "oranges", "qty": { "in stock": 8, "ordered": 12 } }
{ "_id": "avocados", "qty": "fourteen" }
```

The following query uses [`$gt`](https://www.mongodb.com/docs/manual/reference/operator/query/gt/#mongodb-query-op.-gt) to return documents where the
value of `qty` is greater than `4`.

```javascript
db.collection.find( { qty: { $gt: 4 } } )
```

The query returns the following documents:

```javascript
{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }
```

The document with `_id` equal to `"avocados"` is not
returned because its `qty` value is of type `string` while the
[`$gt`](https://www.mongodb.com/docs/manual/reference/operator/query/gt/#mongodb-query-op.-gt) operand is of type `integer`.

The document with `_id` equal to `"oranges"` is not returned
because its `qty` value is of type `object`.

To enforce data types in a collection, use
[Schema Validation](https://www.mongodb.com/docs/manual//core/schema-validation/#).



### Sessions

For cursors created inside a session, you cannot call
[`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) outside the session.

Similarly, for cursors created outside of a session, you cannot call
[`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) inside a session.

#### Session Idle Timeout

MongoDB drivers and [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh)
associate all operations with a [server session](https://www.mongodb.com/docs/manual//reference/server-sessions/#), with the exception of unacknowledged
write operations. For operations not explicitly associated with a
session (i.e. using [`Mongo.startSession()`](https://www.mongodb.com/docs/manual/reference/method/Mongo.startSession/#mongodb-method-Mongo.startSession)), MongoDB drivers
and `mongosh` create an implicit session and associate it
with the operation.

If a session is idle for longer than 30 minutes, the MongoDB server
marks that session as expired and may close it at any time. When the
MongoDB server closes the session, it also kills any in-progress
operations and open cursors associated with the session. This
includes cursors configured with [`noCursorTimeout()`](https://www.mongodb.com/docs/manual/reference/method/cursor.noCursorTimeout/#mongodb-method-cursor.noCursorTimeout) or
a [`maxTimeMS()`](https://www.mongodb.com/docs/manual/reference/method/cursor.maxTimeMS/#mongodb-method-cursor.maxTimeMS) greater than 30 minutes.

For operations that may be idle for longer than 30 minutes, associate
the operation with an explicit session using
[`Mongo.startSession()`](https://www.mongodb.com/docs/manual/reference/method/Mongo.startSession/#mongodb-method-Mongo.startSession) and periodically refresh the session
using the [`refreshSessions`](https://www.mongodb.com/docs/manual/reference/command/refreshSessions/#mongodb-dbcommand-dbcmd.refreshSessions) command. See [Session Idle Timeout](https://www.mongodb.com/docs/manual/reference/limits/#mongodb-limit-Session-Idle-Timeout) for more information.





### Transactions

[`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) can be used inside [multi-document transactions](https://www.mongodb.com/docs/manual/core/transactions/#std-label-transactions).

- For cursors created outside of a transaction, you cannot call
[`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) inside the transaction.


- For cursors created in a transaction, you cannot call
[`getMore`](https://www.mongodb.com/docs/manual/reference/command/getMore/#mongodb-dbcommand-dbcmd.getMore) outside the transaction.

In most cases, multi-document transaction incurs a greater
performance cost over single document writes, and the
availability of multi-document transactions should not be a
replacement for effective schema design. For many scenarios, the
[denormalized data model (embedded documents and arrays)](https://www.mongodb.com/docs/manual/core/data-model-design/#std-label-data-modeling-embedding) will continue to be optimal for your
data and use cases. That is, for many scenarios, modeling your data
appropriately will minimize the need for multi-document
transactions.

For additional transactions usage considerations
(such as runtime limit and oplog size limit), see also
[Production Considerations](https://www.mongodb.com/docs/manual/core/transactions-production-consideration/#std-label-production-considerations).

[`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find)

### Client Disconnection

Starting in MongoDB 4.2, if the client that issued [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find)
disconnects before the operation completes, MongoDB marks [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find)
for termination using [`killOp`](https://www.mongodb.com/docs/manual/reference/command/killOp/#mongodb-dbcommand-dbcmd.killOp).





## Examples

The examples in this section use documents from the [bios
collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/#std-label-bios-example-collection) where the documents
generally have the form:

```javascript
{
    "_id" : <value>,
    "name" : { "first" : <string>, "last" : <string> },       // embedded document
    "birth" : <ISODate>,
    "death" : <ISODate>,
    "contribs" : [ <string>, ... ],                           // Array of Strings
    "awards" : [
        { "award" : <string>, year: <number>, by: <string> }  // Array of embedded documents
        ...
    ]
}
```

To create and populate the `bios` collection, see
[bios collection](https://www.mongodb.com/docs/manual/reference/bios-example-collection/#std-label-bios-example-collection).

### Find All Documents in a Collection

The [`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) method with no parameters
returns all documents from a collection and returns all fields for the
documents. For example, the following operation returns all documents in
the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#):

```javascript
db.bios.find()
```



### Find Documents that Match Query Criteria

#### Query for Equality

- The following operation returns documents in the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where `_id` equals
`5`:

```javascript
db.bios.find( { _id: 5 } )
```


- The following operation returns documents in the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where the field
`last` in the `name` embedded document equals `"Hopper"`:

```javascript
db.bios.find( { "name.last": "Hopper" } )
```

To access fields in an embedded document, use [dot notation](https://www.mongodb.com/docs/manual/core/document/#std-label-document-dot-notation-embedded-fields) (`"<embedded
document>.<field>"`).



#### Query Using Operators

To find documents that match a set of selection criteria, call
[`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) with the `<criteria>` parameter.

MongoDB provides various [query operators](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors) to
specify the criteria.

- The following operation uses the [`$in`](https://www.mongodb.com/docs/manual/reference/operator/query/in/#mongodb-query-op.-in) operator to return
documents in the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where `_id` equals either
`5` or `ObjectId("507c35dd8fada716c89d0013")`:

```javascript
db.bios.find(
   { _id: { $in: [ 5, ObjectId("507c35dd8fada716c89d0013") ] } }
)
```


- The following operation uses the [`$gt`](https://www.mongodb.com/docs/manual/reference/operator/query/gt/#mongodb-query-op.-gt) operator returns all
the documents from the `bios` collection where `birth` is
greater than `new Date('1950-01-01')`:

```javascript
db.bios.find( { birth: { $gt: new Date('1950-01-01') } } )
```


- The following operation uses the [`$regex`](https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-regex) operator to return
documents in the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where `name.last` field
starts with the letter `N` (or is `"LIKE N%"`)

```javascript
db.bios.find(
   { "name.last": { $regex: /^N/ } }
)
```

For a list of the query operators, see [Query Selectors](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors).



#### Query for Ranges

Combine comparison operators to specify ranges for a field. The
following operation returns from the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) documents where `birth` is
between `new Date('1940-01-01')` and `new Date('1960-01-01')`
(exclusive):

```javascript
db.bios.find( { birth: { $gt: new Date('1940-01-01'), $lt: new Date('1960-01-01') } } )
```

For a list of the query operators, see [Query Selectors](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors).



#### Query for Multiple Conditions

The following operation returns all the documents from the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where `birth` field
is [`greater than`](https://www.mongodb.com/docs/manual/reference/operator/query/gt/#mongodb-query-op.-gt) `new Date('1950-01-01')` and `death`
field does not exists:

```javascript
db.bios.find( {
   birth: { $gt: new Date('1920-01-01') },
   death: { $exists: false }
} )
```

For a list of the query operators, see [Query Selectors](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors).

Query Embedded DocumentsQuery Embedded Documents



### Query Embedded Documents

The following examples query the `name` embedded field in the
[bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#).

#### Query Exact Matches on Embedded Documents

The following operation returns documents in the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where the embedded document `name` is
*exactly* `{ first: "Yukihiro", last: "Matsumoto" }`, including the
order:

```javascript
db.bios.find(
    { name: { first: "Yukihiro", last: "Matsumoto" } }
)
```

The `name` field must match the embedded document exactly. The query does
**not** match documents with the following `name` fields:

```javascript
{
   first: "Yukihiro",
   aka: "Matz",
   last: "Matsumoto"
}

{
   last: "Matsumoto",
   first: "Yukihiro"
}
```



#### Query Fields of an Embedded Document

The following operation returns documents in the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where the embedded document `name`
contains a field `first` with the value `"Yukihiro"` and a field
`last` with the value `"Matsumoto"`. The query uses [dot notation](https://www.mongodb.com/docs/manual/reference/glossary/#std-term-dot-notation) to access fields in an embedded document:

```javascript
db.bios.find(
   {
     "name.first": "Yukihiro",
     "name.last": "Matsumoto"
   }
)
```

The query matches the document where the `name` field contains an
embedded document with the field `first` with the value `"Yukihiro"` and a
field `last` with the value `"Matsumoto"`. For instance, the query
would match documents with `name` fields that held either of the
following values:

```javascript
{
  first: "Yukihiro",
  aka: "Matz",
  last: "Matsumoto"
}

{
  last: "Matsumoto",
  first: "Yukihiro"
}
```

For more information and examples, see also [Query on Embedded/Nested Documents](https://www.mongodb.com/docs/manual//tutorial/query-embedded-documents/#).





### Query Arrays

#### Query for an Array Element

The following examples query the `contribs` array in the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#).

- The following operation returns documents in the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where the array
field `contribs` contains the element `"UNIX"`:

```javascript
db.bios.find( { contribs: "UNIX" } )
```


- The following operation returns documents in the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where the array
field `contribs` contains the element `"ALGOL"` or `"Lisp"`:

```javascript
db.bios.find( { contribs: { $in: [ "ALGOL", "Lisp" ]} } )
```


- The following operation use the [`$all`](https://www.mongodb.com/docs/manual/reference/operator/query/all/#mongodb-query-op.-all) query operator to
return documents in the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where the array field
`contribs` contains both the elements `"ALGOL"` and `"Lisp"`:

```javascript
db.bios.find( { contribs: { $all: [ "ALGOL", "Lisp" ] } } )
```

For more examples, see [`$all`](https://www.mongodb.com/docs/manual/reference/operator/query/all/#mongodb-query-op.-all).  See also [`$elemMatch`](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch).


- The following operation uses the [`$size`](https://www.mongodb.com/docs/manual/reference/operator/query/size/#mongodb-query-op.-size) operator to return
documents in the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where the array size
of `contribs` is 4:

```javascript
db.bios.find( { contribs: { $size: 4 } } )
```

For more information and examples of querying an array, see:

- [Query an Array](https://www.mongodb.com/docs/manual//tutorial/query-arrays/#)


- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual//tutorial/query-array-of-documents/#)

For a list of array specific query operators, see [Array](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-operator-query-array).



#### Query an Array of Documents

The following examples query the `awards` array in the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#).

- The following operation returns documents in the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where the `awards`
array contains an element with `award` field equals
`"Turing Award"`:

```javascript
db.bios.find(
   { "awards.award": "Turing Award" }
)
```


- The following operation returns documents in the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) where the `awards`
array contains at least one element with both the `award` field
equals `"Turing Award"` and the `year` field greater than 1980:

```javascript
db.bios.find(
   { awards: { $elemMatch: { award: "Turing Award", year: { $gt: 1980 } } } }
)
```

Use the [`$elemMatch`](https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch) operator to specify multiple criteria on
an array element.

For more information and examples of querying an array, see:

- [Query an Array](https://www.mongodb.com/docs/manual//tutorial/query-arrays/#)


- [Query an Array of Embedded Documents](https://www.mongodb.com/docs/manual//tutorial/query-array-of-documents/#)

For a list of array specific query operators, see [Array](https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-operator-query-array).

Projections



### Projections

The [projection](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#std-label-find-projection) parameter specifies which fields
to return. The parameter contains either include or exclude
specifications, not both, unless the exclude is for the `_id` field.

Unless the `_id` field is explicitly excluded in the projection
document `_id: 0`, the `_id` field is returned.

#### Specify the Fields to Return

The following operation finds all documents in the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) and returns only the `name`
field, `contribs` field and `_id` field:

```javascript
db.bios.find( { }, { name: 1, contribs: 1 } )
```

Unless the `_id` field is explicitly excluded in the projection
document `_id: 0`, the `_id` field is returned.



#### Explicitly Excluded Fields

The following operation queries the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) and returns all fields *except*
the `first` field in the `name` embedded document and the `birth`
field:

```javascript
db.bios.find(
   { contribs: 'OOP' },
   { 'name.first': 0, birth: 0 }
)
```



#### Explicitly Exclude the `_id` Field

Unless the `_id` field is explicitly excluded in the projection
document `_id: 0`, the `_id` field is returned.

The following operation finds documents in the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) and returns only the `name`
field and the `contribs` field:

```javascript
db.bios.find(
   { },
   { name: 1, contribs: 1, _id: 0 }
)
```



#### On Arrays and Embedded Documents

The following operation queries the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) and returns the `last` field in
the `name` embedded document and the first two elements in the `contribs`
array:

```javascript
db.bios.find(
   { },
   { _id: 0, 'name.last': 1, contribs: { $slice: 2 } } )
```

Starting in MongoDB 4.4, you can also specify embedded fields using the
nested form, for example:

```javascript
db.bios.find(
   { },
   { _id: 0, name: { last: 1 }, contribs: { $slice: 2 } }
)
```



#### Use Aggregation Expression

Starting in MongoDB 4.4, [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) projection can
accept [aggregation expressions and syntax](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#std-label-aggregation-expressions).

With the use of aggregation expressions and syntax, you can project new
fields or project existing fields with new values. For example, the
following operation uses aggregation expressions to override the value
of the `name` and `awards` fields as well as to include new fields
`reportDate`, `reportBy`, and `reportNumber`.

```javascript
db.bios.find(
   { },
   {
     _id: 0,
     name: {
        $concat: [
           { $ifNull: [ "$name.aka", "$name.first" ] },
           " ",
           "$name.last"
        ]
     },
     birth: 1,
     contribs: 1,
     awards: { $cond: { if: { $isArray: "$awards" }, then: { $size: "$awards" }, else: 0 } },
     reportDate: { $dateToString: {  date: new Date(), format: "%Y-%m-%d" } },
     reportBy: "hellouser123",
     reportNumber: { $literal: 1 }
   }
)
```

To set the `reportRun` field to the value `1`
The operation returns the following documents:

```javascript
{ "birth" : ISODate("1924-12-03T05:00:00Z"), "contribs" : [ "Fortran", "ALGOL", "Backus-Naur Form", "FP" ], "name" : "John Backus", "awards" : 4, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1927-09-04T04:00:00Z"), "contribs" : [ "Lisp", "Artificial Intelligence", "ALGOL" ], "name" : "John McCarthy", "awards" : 3, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1906-12-09T05:00:00Z"), "contribs" : [ "UNIVAC", "compiler", "FLOW-MATIC", "COBOL" ], "name" : "Grace Hopper", "awards" : 4, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1926-08-27T04:00:00Z"), "contribs" : [ "OOP", "Simula" ], "name" : "Kristen Nygaard", "awards" : 3, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1931-10-12T04:00:00Z"), "contribs" : [ "OOP", "Simula" ], "name" : "Ole-Johan Dahl", "awards" : 3, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1956-01-31T05:00:00Z"), "contribs" : [ "Python" ], "name" : "Guido van Rossum", "awards" : 2, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1941-09-09T04:00:00Z"), "contribs" : [ "UNIX", "C" ], "name" : "Dennis Ritchie", "awards" : 3, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1965-04-14T04:00:00Z"), "contribs" : [ "Ruby" ], "name" : "Matz Matsumoto", "awards" : 1, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "birth" : ISODate("1955-05-19T04:00:00Z"), "contribs" : [ "Java" ], "name" : "James Gosling", "awards" : 2, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
{ "contribs" : [ "Scala" ], "name" : "Martin Odersky", "awards" : 0, "reportDate" : "2020-06-05", "reportBy" : "hellouser123", "reportNumber" : 1 }
```

[Project Fields to Return from Query](https://www.mongodb.com/docs/manual//tutorial/project-fields-from-query-results/#)

Iterate the Returned Cursor



### Iterate the Returned Cursor

The [`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) method returns a
[cursor](https://www.mongodb.com/docs/manual/tutorial/iterate-a-cursor/#std-label-read-operations-cursors) to the results.

In [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh), if the returned cursor is not assigned to a
variable using the `var` keyword, the cursor is automatically iterated to
access up to the first 20 documents that match the query. You can set the
`DBQuery.shellBatchSize` variable to change the number of automatically
iterated documents.

To manually iterate over the results, assign the returned cursor to a variable
with the `var` keyword, as shown in the following sections.

#### With Variable Name

The following example uses the variable `myCursor` to iterate over the
cursor and print the matching documents:

```javascript
var myCursor = db.bios.find( );

myCursor
```



#### With `next()` Method

The following example uses the cursor method [`next()`](https://www.mongodb.com/docs/manual/reference/method/cursor.next/#mongodb-method-cursor.next) to
access the documents:

```javascript
var myCursor = db.bios.find( );

var myDocument = myCursor.hasNext() ? myCursor.next() : null;

if (myDocument) {
    var myName = myDocument.name;
    print (tojson(myName));
}
```

To print, you can also use the `printjson()` method instead of
`print(tojson())`:

```javascript
if (myDocument) {
   var myName = myDocument.name;
   printjson(myName);
}
```



#### With `forEach()` Method

The following example uses the cursor method [`forEach()`](https://www.mongodb.com/docs/manual/reference/method/cursor.forEach/#mongodb-method-cursor.forEach)
to iterate the cursor and access the documents:

```javascript
var myCursor = db.bios.find( );

myCursor.forEach(printjson);
```

Modify the Cursor Behavior



### Modify the Cursor Behavior

[`mongosh`](https://www.mongodb.com/docs/mongodb-shell/#mongodb-binary-bin.mongosh) and the drivers provide several cursor methods that call on the
*cursor* returned by the [`find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) method to
modify its behavior.

#### Order Documents in the Result Set

The [`sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort) method orders the documents in the result
set. The following operation returns documents in the [bios
collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) sorted in ascending
order by the `name` field:

```javascript
db.bios.find().sort( { name: 1 } )
```

[`sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort) corresponds to the `ORDER BY`
statement in SQL.



#### Limit the Number of Documents to Return

The [`limit()`](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#mongodb-method-cursor.limit) method limits the number of documents in
the result set. The following operation returns at most `5` documents
in the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#):

```javascript
db.bios.find().limit( 5 )
```

[`limit()`](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#mongodb-method-cursor.limit) corresponds to the `LIMIT`
statement in SQL.



#### Set the Starting Point of the Result Set

The [`skip()`](https://www.mongodb.com/docs/manual/reference/method/cursor.skip/#mongodb-method-cursor.skip) method controls the starting point of the
results set. The following operation skips the first `5` documents in
the [bios collection](https://www.mongodb.com/docs/manual//reference/bios-example-collection/#) and
returns all remaining documents:

```javascript
db.bios.find().skip( 5 )
```



#### Specify Collation

[Collation](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation) allows users to specify
language-specific rules for string comparison, such as rules for
lettercase and accent marks.

The [`collation()`](https://www.mongodb.com/docs/manual/reference/method/cursor.collation/#mongodb-method-cursor.collation) method specifies the [collation](https://www.mongodb.com/docs/manual/reference/collation/#std-label-collation) for the [`db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find) operation.

```javascript
db.bios.find( { "name.last": "hopper" } ).collation( { locale: "en_US", strength: 1 } )
```



#### Combine Cursor Methods

The following statements chain cursor methods [`limit()`](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#mongodb-method-cursor.limit)
and [`sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort):

```javascript
db.bios.find().sort( { name: 1 } ).limit( 5 )
db.bios.find().limit( 5 ).sort( { name: 1 } )
```

The two statements are equivalent; i.e. the order in which you chain
the [`limit()`](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#mongodb-method-cursor.limit) and the [`sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort) methods
is not significant. Both statements return the first five documents, as
determined by the ascending sort order on 'name'.

Available `mongosh` Cursor Methods

#### Available `mongosh` Cursor Methods

- [`cursor.allowDiskUse()`](https://www.mongodb.com/docs/manual/reference/method/cursor.allowDiskUse/#mongodb-method-cursor.allowDiskUse)


- [`cursor.allowPartialResults()`](https://www.mongodb.com/docs/manual/reference/method/cursor.allowPartialResults/#mongodb-method-cursor.allowPartialResults)


- [`cursor.batchSize()`](https://www.mongodb.com/docs/manual/reference/method/cursor.batchSize/#mongodb-method-cursor.batchSize)


- [`cursor.close()`](https://www.mongodb.com/docs/manual/reference/method/cursor.close/#mongodb-method-cursor.close)


- [`cursor.isClosed()`](https://www.mongodb.com/docs/manual/reference/method/cursor.isClosed/#mongodb-method-cursor.isClosed)


- [`cursor.collation()`](https://www.mongodb.com/docs/manual/reference/method/cursor.collation/#mongodb-method-cursor.collation)


- [`cursor.comment()`](https://www.mongodb.com/docs/manual/reference/method/cursor.comment/#mongodb-method-cursor.comment)


- [`cursor.count()`](https://www.mongodb.com/docs/manual/reference/method/cursor.count/#mongodb-method-cursor.count)


- [`cursor.explain()`](https://www.mongodb.com/docs/manual/reference/method/cursor.explain/#mongodb-method-cursor.explain)


- [`cursor.forEach()`](https://www.mongodb.com/docs/manual/reference/method/cursor.forEach/#mongodb-method-cursor.forEach)


- [`cursor.hasNext()`](https://www.mongodb.com/docs/manual/reference/method/cursor.hasNext/#mongodb-method-cursor.hasNext)


- [`cursor.hint()`](https://www.mongodb.com/docs/manual/reference/method/cursor.hint/#mongodb-method-cursor.hint)


- [`cursor.isExhausted()`](https://www.mongodb.com/docs/manual/reference/method/cursor.isExhausted/#mongodb-method-cursor.isExhausted)


- [`cursor.itcount()`](https://www.mongodb.com/docs/manual/reference/method/cursor.itcount/#mongodb-method-cursor.itcount)


- [`cursor.limit()`](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/#mongodb-method-cursor.limit)


- [`cursor.map()`](https://www.mongodb.com/docs/manual/reference/method/cursor.map/#mongodb-method-cursor.map)


- [`cursor.max()`](https://www.mongodb.com/docs/manual/reference/method/cursor.max/#mongodb-method-cursor.max)


- [`cursor.maxTimeMS()`](https://www.mongodb.com/docs/manual/reference/method/cursor.maxTimeMS/#mongodb-method-cursor.maxTimeMS)


- [`cursor.min()`](https://www.mongodb.com/docs/manual/reference/method/cursor.min/#mongodb-method-cursor.min)


- [`cursor.next()`](https://www.mongodb.com/docs/manual/reference/method/cursor.next/#mongodb-method-cursor.next)


- [`cursor.noCursorTimeout()`](https://www.mongodb.com/docs/manual/reference/method/cursor.noCursorTimeout/#mongodb-method-cursor.noCursorTimeout)


- [`cursor.objsLeftInBatch()`](https://www.mongodb.com/docs/manual/reference/method/cursor.objsLeftInBatch/#mongodb-method-cursor.objsLeftInBatch)


- [`cursor.pretty()`](https://www.mongodb.com/docs/manual/reference/method/cursor.pretty/#mongodb-method-cursor.pretty)


- [`cursor.readConcern()`](https://www.mongodb.com/docs/manual/reference/method/cursor.readConcern/#mongodb-method-cursor.readConcern)


- [`cursor.readPref()`](https://www.mongodb.com/docs/manual/reference/method/cursor.readPref/#mongodb-method-cursor.readPref)


- [`cursor.returnKey()`](https://www.mongodb.com/docs/manual/reference/method/cursor.returnKey/#mongodb-method-cursor.returnKey)


- [`cursor.showRecordId()`](https://www.mongodb.com/docs/manual/reference/method/cursor.showRecordId/#mongodb-method-cursor.showRecordId)


- [`cursor.size()`](https://www.mongodb.com/docs/manual/reference/method/cursor.size/#mongodb-method-cursor.size)


- [`cursor.skip()`](https://www.mongodb.com/docs/manual/reference/method/cursor.skip/#mongodb-method-cursor.skip)


- [`cursor.sort()`](https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#mongodb-method-cursor.sort)


- [`cursor.tailable()`](https://www.mongodb.com/docs/manual/reference/method/cursor.tailable/#mongodb-method-cursor.tailable)


- [`cursor.toArray()`](https://www.mongodb.com/docs/manual/reference/method/cursor.toArray/#mongodb-method-cursor.toArray)





### Use Variables in `let` Option

You can specify query options to modify query behavior and indicate how
results are returned.

For example, to define variables that you can access elsewhere in the
`find` method, use the `let` option. To filter results using a
variable, you must access the variable within the [`$expr`](https://www.mongodb.com/docs/manual/reference/operator/query/expr/#mongodb-query-op.-expr)
operator.

Create a collection `cakeFlavors`:

```javascript
db.cakeFlavors.insertMany( [
   { _id: 1, flavor: "chocolate" },
   { _id: 2, flavor: "strawberry" },
   { _id: 3, flavor: "cherry" }
] )
```

The following example defines a `targetFlavor` variable in `let` and
uses the variable to retrieve the chocolate cake flavor:

```javascript
db.cakeFlavors.find(
   { $expr: { $eq: [ "$flavor", "$$targetFlavor" ] } },
   { _id: 0 },
   { let : { targetFlavor: "chocolate" }
} )
```

Output:

```javascript
[ { flavor: 'chocolate' } ]
```

To see all available query options, see FindOptions.







