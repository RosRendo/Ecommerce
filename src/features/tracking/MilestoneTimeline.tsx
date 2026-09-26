'use client';

import React from 'react';
import { Check, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import { ShipmentMilestone } from '@/types';

interface MilestoneTimelineProps {
  milestones: ShipmentMilestone[];
  orderNumber: string;
  trackingCode: string;
  carrier: string;
  estimatedDelivery: string;
  origin: string;
  destination: string;
}

export function MilestoneTimeline({
  milestones,
  orderNumber,
  trackingCode,
  carrier,
  estimatedDelivery,
  origin,
  destination,
}: MilestoneTimelineProps) {
  return (
    <div className="space-y-10">
      {/* Shipment Meta Card */}
      <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
              Order Reference
            </span>
            <span className="font-mono text-sm text-[#000000] font-medium block">
              {orderNumber}
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
              Carrier &amp; Code
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[#000000] font-medium">{carrier}</span>
              <span className="font-mono text-[11px] text-[#525252]">({trackingCode})</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
              Estimated Delivery
            </span>
            <span className="text-sm text-[#000000] font-medium block">
              {estimatedDelivery}
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#525252] block">
              Routing Corridor
            </span>
            <span className="text-xs text-[#525252] block truncate">
              {origin} → {destination}
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Vertical Milestone Timeline (Strictly No Map) */}
      <div className="relative pl-6 sm:pl-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-[1px] before:bg-[#E5E5E5]">
        <div className="space-y-10">
          {milestones.map((milestone, idx) => {
            return (
              <div key={milestone.id} className="relative group">
                {/* Node Indicator */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 flex items-center justify-center transition-colors ${
                    milestone.isCompleted
                      ? 'bg-[#000000] text-[#FFFFFF]'
                      : milestone.isCurrent
                      ? 'bg-[#000000] text-[#FFFFFF] ring-4 ring-[#E5E5E5]'
                      : 'bg-[#FFFFFF] border border-[#E5E5E5] text-[#A3A3A3]'
                  }`}
                >
                  {milestone.isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : milestone.isCurrent ? (
                    <span className="w-2 h-2 bg-[#FFFFFF] rounded-none animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 bg-[#E5E5E5]" />
                  )}
                </div>

                {/* Milestone Details */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center space-x-3">
                      <h3
                        className={`text-sm tracking-[0.04em] ${
                          milestone.isCompleted || milestone.isCurrent
                            ? 'text-[#000000] font-medium'
                            : 'text-[#525252] font-normal'
                        }`}
                      >
                        {milestone.stageName}
                      </h3>

                      {milestone.isCurrent && (
                        <span className="px-2 py-0.5 bg-[#000000] text-[#FFFFFF] text-[9px] uppercase tracking-[0.2em] font-mono">
                          Active Milestone
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-mono text-[#525252]">
                      {milestone.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-[#525252] leading-relaxed max-w-2xl">
                    {milestone.description}
                  </p>

                  <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.16em] text-[#A3A3A3] pt-0.5">
                    <span>Location:</span>
                    <strong className="text-[#000000] font-normal">{milestone.location}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Dispatch Guarantee Notice */}
      <div className="pt-6 border-t border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#525252] gap-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-[#000000]" />
          <span>Real-time logistics stream updated every 60 minutes via DHL Diplomatic Air API.</span>
        </div>

        <span className="text-[11px] uppercase tracking-[0.14em] text-[#000000]">
          Insured for Full Replacement Value
        </span>
      </div>
    </div>
  );
}
