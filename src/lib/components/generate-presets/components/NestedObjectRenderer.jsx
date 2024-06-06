function NestedObjectRenderer({
  data,
  title,
  handleSelectedField,
  setSelectedObjectName,
}) {
  const childObjs = [];
  const items = [];

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "object") {
      childObjs.push(
        <NestedObjectRenderer
          data={value}
          title={key}
          key={key}
          handleSelectedField={handleSelectedField}
          setSelectedObjectName={setSelectedObjectName}
        />
      );
    } else {
      items.push(
        <Item
          key={key}
          title={title}
          itemKey={key}
          value={value}
          handleSelectedField={handleSelectedField}
        />
      );
    }
  });

  return (
    <div
    // style={{ background: "gray" }}
    >
      <h3 onDoubleClick={() => setSelectedObjectName(title)}>{title}</h3>

      <div className="items">{items}</div>

      <div className="children">{childObjs}</div>
    </div>
  );
}

export default NestedObjectRenderer;

function Item({ title, itemKey, value, handleSelectedField }) {
  return (
    <div
      className="item"
      onClick={() =>
        handleSelectedField({
          key: itemKey,
          value: value,
          parent: title ? title : "root",
        })
      }
    >
      <span>{itemKey}</span> : <span>{value}</span>
    </div>
  );
}
