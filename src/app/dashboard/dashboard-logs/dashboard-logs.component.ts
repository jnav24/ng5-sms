import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {LogService} from '@app/common/services/log.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import {LogInterface} from '@app/common/interfaces/log.interface';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-dashboard-logs',
    templateUrl: './dashboard-logs.component.html',
    styleUrls: ['./dashboard-logs.component.scss']
})
export class DashboardLogsComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['created', 'level', 'page', 'message'];
    dataSource;
    private dataSourceSubscription: Subscription;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private log: LogService) { }

    ngOnInit() {
        // const log = {
        //     level: 'debug',
        //     message: 'testing write',
        //     page: 'logs'
        // };
        // this.log.writeLog(log);
        this.dataSourceSubscription = this.log
            .getLogs()
            .map(logs => {
                _.forEach(logs, log => {
                    log.created = moment.unix(log.created).format('MMM DD, YYYY HH:mm:ss');
                });

                return logs;
            })
            .subscribe((logs: LogInterface[]) => {
                this.dataSource = new MatTableDataSource<LogInterface>(logs);
                this.dataSource.paginator = this.paginator;
            });
    }

    ngOnDestroy() {
        this.dataSourceSubscription.unsubscribe();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
