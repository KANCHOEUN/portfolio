import { PigrestInfo, PigrestDiagram } from "./pigrest";
import { ReVerseInfo, ReVerseDiagram } from "./re-verse";
import { ParsleyInfo, ParsleyDiagram } from "./parsley";
import { MocklyInfo, MocklyDiagram } from "./mockly";

export const infoContents = {
  project1: PigrestInfo,
  project2: ReVerseInfo,
  project3: ParsleyInfo,
  project4: MocklyInfo,
};

export const diagramContents = {
  project1: PigrestDiagram,
  project2: ReVerseDiagram,
  project3: ParsleyDiagram,
  project4: MocklyDiagram,
};
