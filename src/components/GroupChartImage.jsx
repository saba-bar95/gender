import { getGroupChartImage } from "../utils/chartGroupImages";
import "./GroupChartImage.scss";

/**
 * @param {{ sectionId: string; groupName: string; datasetId?: string }} props
 */
const GroupChartImage = ({ sectionId, groupName, datasetId }) => {
  const image = getGroupChartImage(sectionId, groupName, datasetId);
  if (!image) return null;

  return (
    <div className="group-chart-image" aria-hidden>
      <img src={image.url} alt="" />
    </div>
  );
};

export default GroupChartImage;
