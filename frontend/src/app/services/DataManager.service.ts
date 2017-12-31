import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Config } from '../services/Config.service';
import { AuthService } from './Auth.service';

/**
 * Service that provides a wrapper for retrieving data from the server
 *
 * @author Joshua Kissoon
 * @since 20170709
 */
@Injectable()
export class DataManager
{

    public constructor(protected config: Config, protected http: Http,
        protected authService: AuthService, private router: Router) { }

    getAccessToken()
    {
        return this.authService.getAccessToken();
    }

    getBaseUrl()
    {
        return this.config.getBaseUrl();
    }

    getDefaultHeaders()
    {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getAccessToken(),
        });

        return headers;
    }

    /**
     * Callback wrapper for the HTTP GET Call
     *
     * @param urlq The query part of the URL to be sent to the server
     *
     * @author Joshua Kissoon
     * @since 20160826
     * @updated 20170711 to add parameters
     */
    GET(urlq: string, paramsIn = {})
    {
        let params: URLSearchParams = new URLSearchParams();
        for (var key in paramsIn)
        {
            params.set(key, paramsIn[key]);
        }

        return this.http
            .get(this.getBaseUrl() + urlq, { headers: this.getDefaultHeaders(), body: '', params: params })
            .map((response) =>
            {
                return response.json()
            })
            .toPromise();
    }

    /**
     * Callback wrapper for the HTTP POST Call
     *
     * @param urlq The query part of the URL to be sent to the server
     * @param object The object containing the POST data to be sent
     *
     * @author Joshua Kissoon
     * @since 20160826
     */
    POST(urlq: string, object: any)
    {
        if (null == object)
        {
            object = { "blank": "blank" };
        }

        return this.http
            .post(this.getBaseUrl() + urlq, JSON.stringify(object), { headers: this.getDefaultHeaders() })
            .map((response) =>
            {
                return response.json()
            })
            .toPromise();
    }

    /**
     * Callback wrapper for the HTTP POST Call
     *
     * @param urlq The query part of the URL to be sent to the server
     * @param object The object containing the POST data to be sent
     *
     * @author Joshua Kissoon
     * @since 20160826
     */
    POSTRAW(urlq: string, object: any)
    {
        const headers = new Headers({
            'Authorization': 'Bearer ' + this.getAccessToken(),
        });

        return this.http
            .post(this.getBaseUrl() + urlq, object, { headers: headers })
            .map((response) =>
            {
                return response.json()
            })
            .toPromise();
    }


    /**
     * Callback wrapper for the HTTP PUT Call
     *
     * @param urlq The query part of the URL to be sent to the server
     * @param object The object containing the PUT data to be sent
     *
     * @author Joshua Kissoon
     * @since 20160826
     */
    PUT(urlq: string, object: any)
    {
        if (null == object)
        {
            object = { "blank": "blank" };
        }

        return this.http
            .put(this.getBaseUrl() + urlq, JSON.stringify(object), { headers: this.getDefaultHeaders() })
            .map((response) =>
            {
                return response.json()
            })
            .toPromise();
    }

    /**
     * Callback wrapper for the HTTP PATCH Call
     *
     * @param urlq The query part of the URL to be sent to the server
     * @param object The object containing the PUT data to be sent
     *
     * @author Joshua Kissoon
     * @since 20161107
     */
    PATCH(urlq: string, object: any)
    {
        if (null == object)
        {
            object = { "blank": "blank" };
        }

        return this.http
            .patch(this.getBaseUrl() + urlq, JSON.stringify(object), { headers: this.getDefaultHeaders() })
            .map((response) =>
            {
                return response.json()
            })
            .toPromise();
    }

    /**
     * Callback wrapper for the HTTP DELETE Call
     *
     * @param urlq The query part of the URL to be sent to the server
     *
     * @author Joshua Kissoon
     * @since 20160826
     */
    DELETE(urlq: string)
    {
        return this.http
            .delete(this.getBaseUrl() + urlq, { headers: this.getDefaultHeaders(), body: '' })
            .map((response) =>
            {
                return response.json()
            })
            .toPromise();
    }

}
