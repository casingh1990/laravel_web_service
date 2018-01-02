@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    <h3>Your Videos</h3>
                    @foreach ($videos as $video)
                        <p>This is video <a href="{{ $video->file }}">{{ $video->name }}</a></p>
                    @endforeach
                </div>
                <div class="panel-footer"><a href="videos/create">Add New Video</a></div>
            </div>
        </div>
    </div>
</div>
@endsection
