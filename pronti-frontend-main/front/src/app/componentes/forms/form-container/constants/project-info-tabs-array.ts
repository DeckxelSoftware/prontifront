import {
  DataTabsArraysEnum,
  TabsArrays,
} from "../../../tables/company-info-table/interfaces/tabs-arrays";
import { ProjectInformationEnum } from "../../../company-information-modal/enums/project-information.enum";

export const PROJECT_INFO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "Project Info from Project Module",
    label: "Project Info",
    icon: "pi pi-home",
    data: [
      {
        showingName: "Client name",
        fieldName: ProjectInformationEnum.companyId,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Project Status",
        fieldName: ProjectInformationEnum.status,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Project Type",
        fieldName: ProjectInformationEnum.type,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Project Name",
        fieldName: ProjectInformationEnum.name,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Market Sector",
        fieldName: ProjectInformationEnum.marketSector,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Project Number",
        fieldName: ProjectInformationEnum.id,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Practice Area",
        fieldName: ProjectInformationEnum.practiceArea,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Project Territory",
        fieldName: ProjectInformationEnum.projectTerritory,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "DSP Sectors",
        fieldName: ProjectInformationEnum.dspSectors,
        type: DataTabsArraysEnum.string,
      },
    ],
  },
  {
    id: "Project Location Info from Project Module",
    label: "Project Location Info",
    icon: "pi pi-map-marker",
    data: [
      {
        showingName: "Project Address",
        fieldName: ProjectInformationEnum.projectAddress,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Suite",
        fieldName: ProjectInformationEnum.suite,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Building type",
        fieldName: ProjectInformationEnum.buildingType,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "City",
        fieldName: ProjectInformationEnum.city,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "State",
        fieldName: ProjectInformationEnum.state,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Zip",
        fieldName: ProjectInformationEnum.zip,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Project Size (Area)",
        fieldName: ProjectInformationEnum.projectSizeArea,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Country",
        fieldName: ProjectInformationEnum.country,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Parcel No.",
        fieldName: ProjectInformationEnum.parcelNo,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Project Certifications",
        fieldName: ProjectInformationEnum.projectCertifications,
        type: DataTabsArraysEnum.string,
      },
      {
        showingName: "Project Description",
        fieldName: ProjectInformationEnum.projectDescription,
        type: DataTabsArraysEnum.string,
      },
    ],
  },
];
