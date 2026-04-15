import React from "react";
import type { PipelineStat } from "./stats";

interface PipelinePanelProps {
  pipeline: PipelineStat[];
}

export const PipelinePanel: React.FC<PipelinePanelProps> = ({ pipeline }) => {
  const maxValue = Math.max(...pipeline.map((item) => item.value), 1);

  const total =
    pipeline.find((item) => item.label === "Total inscrits")?.value ?? 0;

  return (
    <div className="sp-panel">
      <div className="sp-panel__header">
        <div>
          <h3 className="sp-panel__title">Mon pipeline</h3>
          <p className="sp-panel__subtitle">
            Répartition des abonnés par statut.
          </p>
        </div>
      </div>

      <ul className="sp-pipeline">
        {pipeline.map((item) => {
          const widthPct = (item.value / maxValue) * 100;
          const sharePct =
            total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <li key={item.label} className="sp-pipeline__row">
              <div className="sp-pipeline__head">
                <span
                  className={`sp-pipeline__dot sp-pipeline__dot--${item.tone}`}
                />
                <span className="sp-pipeline__label">{item.label}</span>
                <span className="sp-pipeline__value">{item.value}</span>
              </div>
              <div className="sp-pipeline__track">
                <div
                  className={`sp-pipeline__fill sp-pipeline__fill--${item.tone}`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              {item.label !== "Total inscrits" && total > 0 ? (
                <div className="sp-pipeline__share">{sharePct}% du total</div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PipelinePanel;
