import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        MatListModule,
        MatFormFieldModule,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
