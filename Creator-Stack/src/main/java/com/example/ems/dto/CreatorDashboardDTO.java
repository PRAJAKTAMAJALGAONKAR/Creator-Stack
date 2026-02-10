package com.example.ems.dto;

import java.math.BigDecimal;
import java.util.Map;

public class CreatorDashboardDTO {

    private long totalBuyers;
    private BigDecimal totalEarnings;
    private Map<String, Long> salesPerContent;

    public CreatorDashboardDTO(long totalBuyers, BigDecimal totalEarnings, Map<String, Long> salesPerContent) {
        this.totalBuyers = totalBuyers;
        this.totalEarnings = totalEarnings;
        this.salesPerContent = salesPerContent;
    }


    public long getTotalBuyers() {
        return totalBuyers;
    }

    public void setTotalBuyers(long totalBuyers) {
        this.totalBuyers = totalBuyers;
    }

    public BigDecimal getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(BigDecimal totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public Map<String, Long> getSalesPerContent() {
        return salesPerContent;
    }

    public void setSalesPerContent(Map<String, Long> salesPerContent) {
        this.salesPerContent = salesPerContent;
    }
}