import "./styles.css";

const JiraCard = ({data}) => {
  return (
    <div className="col-4">
      <div className="card">
      <h2>{data.fields.summary}</h2>
      <p>
        <strong>ID:</strong> {data.key}
      </p>
      <p>
        <strong>Proyecto:</strong> {data.fields.project.name}
      </p>
      <p>
        <strong>Tipo:</strong> Tarea
      </p>
      <p>
        <strong>Prioridad:</strong>{" "}
        <img
          src={data.fields.priority.iconUrl}
          alt="Prioridad"
          width="16"
        />{" "}
        {data.fields.priority.name}
      </p>
      <p>
        <strong>Estado:</strong> <span className="status">{data.fields.status.name}</span>
      </p>
      <p>
        <strong>Descripción:</strong> {data.fields.description.content[0].content[0].text}
      </p>
      <p>
        <strong>Reportado por:</strong>{" "}
        <img
          className="avatar"
          src={data.fields.reporter.avatarUrls["16x16"]}
          alt="Avatar"
        />{" "}
        {data.fields.reporter.displayName}
      </p>
    </div>
    </div>
  );
};

export default JiraCard;
