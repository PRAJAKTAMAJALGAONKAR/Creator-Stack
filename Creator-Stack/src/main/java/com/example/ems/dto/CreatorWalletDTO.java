package com.example.ems.dto;

public class CreatorWalletDTO {

    private long available;
    private long pending;

    public CreatorWalletDTO(long available, long pending) {
        this.available = available;
        this.pending = pending;
    }

    public long getAvailable() {
        return available;
    }

    public long getPending() {
        return pending;
    }
}
