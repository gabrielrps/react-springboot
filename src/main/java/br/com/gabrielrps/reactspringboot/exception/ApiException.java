package br.com.gabrielrps.reactspringboot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.ZonedDateTime;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ApiException {

    private final String message;
    private final ZonedDateTime zonedDateTime;

    public ApiException(String message, ZonedDateTime zonedDateTime) {
        this.message = message;
        this.zonedDateTime = zonedDateTime;
    }

    public String getMessage() {
        return message;
    }

    public ZonedDateTime getZonedDateTime() {
        return zonedDateTime;
    }
}
