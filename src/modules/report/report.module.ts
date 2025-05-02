import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";

const reportService = new ReportService();
const reportController = new ReportController(reportService);

export { reportController };
